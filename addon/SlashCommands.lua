SLASH_MLE1 = "/mle"

local secondaryStatWeights = {
	crit = 10,
	haste = 5,
	mastery = 12,
	vers = 1,
}

local equipment = {}

local function test(arg)
    --EJ_SetDifficulty(arg)
	print(EJ_GetDifficulty())
end



local function commandSeason()
    local maps = C_ChallengeMode.GetMapTable()

    for _, mapID in ipairs(maps) do
        local name = C_ChallengeMode.GetMapUIInfo(mapID)
		print(mapID, name)
	end
end

local function commandJournal()

	local journalInstances = MLE.GetMythicPlusJournalInstanceIDs()
	
	print("Journal IDS")
	for index, value in pairs(journalInstances) do
		print(index .. ": " .. value)
	end
end

local function commandGetLoot(arg)
	
	if arg == nil or arg == "" then
		print("Journal entry ID Required. Try /mle getloot 1299")
		return
	end
	
	local name = EJ_GetInstanceInfo(arg)
	print("---- FOR JOURNAL INSTANCE: ", name)

    EJ_SelectInstance(arg)

    -- Mythic difficulty (important for consistent loot tables)
    EJ_SetDifficulty(23)

    local numLoot = EJ_GetNumLoot()

    print("Loot count:", numLoot)
	
	for i = 1, numLoot do

		local loot = C_EncounterJournal.GetLootInfoByIndex(i)

		if type(loot) == "table" and loot.slot ~= nil and loot.slot ~= "" then
			print(loot.itemID, loot.name, loot.slot)
		end
	end
end

local function commandGetAllLoot(arg)
	if arg == nil or arg == "" then
		print("Journal entry ID Required. Try /mle getallloot 1299")
		return
	end
	
	local name = EJ_GetInstanceInfo(arg)
	print("---- FOR JOURNAL INSTANCE: ", name)

    EJ_SelectInstance(arg)

    -- Mythic difficulty (important for consistent loot tables)
    EJ_SetDifficulty(23)
	
	-- Set the loot filter to all classes all slots
	EJ_SetLootFilter(0, 0)

    local numLoot = EJ_GetNumLoot()
	
    print("Loot count:", numLoot)
	
	for i = 1, numLoot do
	
		local loot = C_EncounterJournal.GetLootInfoByIndex(i)
	
		if type(loot) == "table" and loot.slot ~= nil and loot.slot ~= "" then
			print(loot.itemID, loot.name, loot.slot)
		end
	end
end

local function commandGetItemSecondaryStats(itemId)
	if itemId == nil or itemId == "" then
		print("Item ID Required. Try /mle getsecondarystats 251084")
		return
	end

	local result = MLE.GetItemSecondaryStats(itemId, function(stats)
		if stats then
			print(
				"Crit =", stats.crit,
				"Haste =", stats.haste,
				"Mastery =", stats.mastery,
				"Vers = ", stats.versatility
			)
		end
	end)
end

local function commandSetSecondaryStatWeight(secondaryStat, weight)
	if secondaryStat == nil or secondaryStat == "" or weight == nil or weight == "" then
		print("Secondary Stat and Weight required. Try /mle set crit 25 (use crit, haste, mastery, vers)")
		return
	end

	secondaryStatWeights[secondaryStat] = weight
	print(secondaryStat, "weight set to", weight)
end

local function commandGetBisList() 
	local totalItemCount = 0;
	
	-- Get current M+ dungeons journal IDs
	local journalInstances = MLE.GetMythicPlusJournalInstanceIDs()
	
	-- foreach journal ID
	for journalId, dungeonName in pairs(journalInstances) do
	
		-- Select instance
		EJ_SelectInstance(journalId)

		-- Set to mythic
		EJ_SetDifficulty(23)		
		
		-- Get equipment
		for i = 1, EJ_GetNumLoot() do
		
			local loot = C_EncounterJournal.GetLootInfoByIndex(i)
		
			if type(loot) == "table" and loot.slot ~= nil and loot.slot ~= "" and loot.slot ~= "Trinket" then
				-- Save equipment to dictionary
				totalItemCount = totalItemCount + 1
				loot.dungeon = dungeonName;
				MLE.InsertIntoDictionary(equipment, loot.slot, loot)
				--for key, value in pairs(loot) do
			    --   print(key, value)
			    --end
			end
		end
	end
	
	-- add stats to each slot (THIS IS ASYNCHRONOUS AND NEEDS TO BE FINISHED BEFORE CONTINUING)
	for slot, slotCollection in pairs(equipment) do
		for index, item in pairs(slotCollection) do
			MLE.GetItemSecondaryStats(item.itemID, function(stats)
				item.stats = stats 
				totalItemCount = totalItemCount - 1
				if totalItemCount == 0 then
					MLE.commandGetBisList2(equipment)
				end
			end)
		end
	end
end

-- extension because of how stupid LUA stuff is
function MLE.commandGetBisList2(equipment)
	
	-- sort dictionary by weight per slot
	MLE.SortEquipmentByStatWeights(equipment, secondaryStatWeights)
	
	-- output
	for slot, slotCollection in pairs(equipment) do
		print("SLOT:", slot)
		for index, item in pairs(slotCollection) do
			--print(item.link)
			print(
				item.link, 
				item.dungeon, 
				"Item Score:", item.score)
			--for key, value in pairs(item.stats) do
			--	print(item.link, key, ":", value)
			--end
		end
	end
end

local function commandGetDungeonWeight()
	if next(equipment) == nil then
		print("Run /mle getbislist first to generate weights")
		return
	end
	
	local dungeonScores = {}
	
	-- 1. Loop through every equipment slot (e.g., "legs", "hands")
    for slot, itemList in pairs(equipment) do
        -- Skip slots that have no items
        if #itemList > 0 then
            
            -- Because your dictionary is already sorted, index 1 is ALWAYS the absolute BiS item
            local bisItem = itemList[1]
            local bisScore = bisItem.score or 0
            
            -- Define our 10% threshold line (e.g., if BiS is 100, threshold is 90)
            local thresholdScore = bisScore * 0.90

            -- 2. Loop through all items available for this specific slot
            for index, item in ipairs(itemList) do
                local dungeon = item.dungeon
                local score = item.score or 0

                -- Initialize dungeon entry in our tracking table if it's the first time seeing it
                if not dungeonScores[dungeon] then
                    dungeonScores[dungeon] = {
                        name = dungeon,
                        totalPriorityPoints = 0,
                        bisCount = 0,
                        goodUpgradesCount = 0,
                        badItemsCount = 0
                    }
                end

                local dData = dungeonScores[dungeon]

                -- 3. APPLY SCORING RULES
                if index == 1 then
                    -- RULE A: Absolute BiS Item found!
                    dData.bisCount = dData.bisCount + 1
                    dData.totalPriorityPoints = dData.totalPriorityPoints + 15 -- Heavily reward true BiS
                    
                elseif score >= thresholdScore then
                    -- RULE B: Within 10% of BiS (Great alternative/upgrade!)
                    dData.goodUpgradesCount = dData.goodUpgradesCount + 1
                    
                    -- Scale points linearly: items closer to BiS give more priority points
                    local proximityBonus = (score - thresholdScore) / (bisScore - thresholdScore) -- Value between 0 and 1
                    dData.totalPriorityPoints = dData.totalPriorityPoints + (5 + (proximityBonus * 5)) -- Awards 5 to 10 points
                    
                else
                    -- RULE C: Worse than 10% of BiS ("Bad" item)
                    dData.badItemsCount = dData.badItemsCount + 1
                    dData.totalPriorityPoints = dData.totalPriorityPoints - 2 -- Slight penalty for clogging up the loot table
                end
            end
        end
    end

    -- 4. Convert our dictionary of dungeons into a flat list so we can sort it
    local sortedDungeons = {}
    for _, dungeonData in pairs(dungeonScores) do
        table.insert(sortedDungeons, dungeonData)
    end

    -- 5. Sort dungeons from highest total priority points to lowest
    table.sort(sortedDungeons, function(a, b)
        if a.totalPriorityPoints == b.totalPriorityPoints then
            return a.bisCount > b.bisCount -- Tie-breaker: Dungeon with more absolute BiS items wins
        end
        return a.totalPriorityPoints > b.totalPriorityPoints
    end)

	for index, dungeon in pairs(sortedDungeons) do
		print("Dungeon:", dungeon.name)
		print("Score:", dungeon.totalPriorityPoints)
		print("BIS Count:", dungeon.bisCount)
		print("Bad Count:", dungeon.badItemsCount)
		print("Decent Count:", dungeon.goodUpgradesCount)
		print("------------------------------------------")
	end
end

SlashCmdList["MLE"] = function(arg)

   local command, rest = arg:match("^(%S*)%s*(.-)$")
   
   if command == "season" then
		commandSeason()
   elseif command == "journal" then
		commandJournal()
	elseif command == "getloot" then
		commandGetLoot(rest)
	elseif command == "getallloot" then
		commandGetAllLoot(rest)
	elseif command == "getitemstats" then
		commandGetItemSecondaryStats(rest)
	elseif command == "set" then
		local stat, weight = rest:match("^(%S*)%s*(.-)$")
		commandSetSecondaryStatWeight(stat, weight)
	elseif command == "getbislist" then
		commandGetBisList()
	elseif command == "getdungeondetails" then
		commandGetDungeonWeight()
	elseif command == "test" then
		test(rest)
   else
		print("Usage: /mle [season | journal | getloot]")
   end
end

