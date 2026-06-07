MLE = MLE or {}

function MLE.has_value(dict, target)
    for _, val in pairs(dict) do
        if val == target then
            return true
        end
    end
    return false
end

function MLE.has_key(dict, target)
    for val, _ in pairs(dict) do
        if val == target then
            return true
        end
    end
    return false
end

function MLE.InsertIntoDictionary(dict, key, value)
	if not dict[key] then
		dict[key] = {}
	end
	
	table.insert(dict[key], value)
end


function MLE.GetMythicPlusJournalInstanceIDs()

    local maps = C_ChallengeMode.GetMapTable()
   local mapIds = {}

    for _, mapID in ipairs(maps) do

        local name, id, timeLimit, texture, backgroundTexture, uiMapID = C_ChallengeMode.GetMapUIInfo(mapID)
		mapIds[uiMapID] = name
    end
	
	local journalInstances = {}
	for tier = 1, EJ_GetNumTiers() do

		EJ_SelectTier(tier)
		
		local i = 1
		while true do

			local instanceID, name, _, _, _, _, _, dungeonAreaMapID, _, _, mapID, _, _ = EJ_GetInstanceByIndex(i, false)

			if not name then break end
			
			if name and mapID then
				if MLE.has_key(mapIds, mapID) then
					journalInstances[instanceID] = name
				end
			end

			i = i + 1
		end
	end

    return journalInstances
end

function MLE.GetItemSecondaryStats(itemId, callback)
    local item = Item:CreateFromItemID(tonumber(itemId))

    item:ContinueOnItemLoad(function()
        local itemLink = item:GetItemLink()

        if not itemLink then
            callback(nil)
            return
        end

        local stats = C_Item.GetItemStats(itemLink)

        callback({
            crit = stats.ITEM_MOD_CRIT_RATING_SHORT or 0,
            haste = stats.ITEM_MOD_HASTE_RATING_SHORT or 0,
            mastery = stats.ITEM_MOD_MASTERY_RATING_SHORT or 0,
            versatility = stats.ITEM_MOD_VERSATILITY or 0
        })
    end)
end



function MLE.SortEquipmentByStatWeights(equipment, statWeights)
	for slot, slotCollection in pairs(equipment) do
		for index, item in pairs(slotCollection) do
		    local crit = item.stats.crit or 0
			local haste = item.stats.haste or 0
			local mastery = item.stats.mastery or 0
			local vers = item.stats.versatility or 0
			
			local totalBudget = crit + haste + mastery + vers
		    if totalBudget ~= 0 then
				-- Calculate the relative weight score based on percentage split
				item.score = ((crit / totalBudget) * statWeights.crit)
									+ ((haste / totalBudget) * statWeights.haste)
									+ ((mastery / totalBudget) * statWeights.mastery)
									+ ((vers / totalBudget) * statWeights.vers)
			else
				item.score = 0
			end
		end
		table.sort(slotCollection, function(a, b)
			return a.score > b.score
		end)
	end
end