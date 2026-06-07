# Addon functions
## /mle season
Shows the Map ID of each dungeon in the season (Note that these map IDs are effectively useless)
<img width="206" height="145" alt="image" src="https://github.com/user-attachments/assets/46a4c0a1-9cb9-4fad-872b-182728cbd640" />

## /mle journey
Shows the journey ID of each dungeon in the season (these actually are useful)
<img width="207" height="162" alt="image" src="https://github.com/user-attachments/assets/b746557c-b883-4a2d-aa57-79ba4196b507" />

## /mle getloot <journey ID>
Shows the items available in the dungeon (NOTE: This shows what your current journal selection is. Open the adventure guide and make sure your loot filters are set to your class and spec)
<img width="373" height="181" alt="image" src="https://github.com/user-attachments/assets/cffee7eb-c91f-488c-8e48-af9a1a006371" />

## /mle getallloot <journey ID>
Gets all loot available within a dungeon (filter set to All Classes/All Specs)
<img width="382" height="504" alt="image" src="https://github.com/user-attachments/assets/efd02450-945f-4961-8fe9-f33dfa9f680f" />

## /mle getitemstats <item ID>
Gets blizzards pre-scaled stat weights for an item (see more on learnings at the bottom of this readme)
<img width="300" height="22" alt="image" src="https://github.com/user-attachments/assets/0e187d4e-fe10-4232-b406-2edf9ae6918b" />

## /mle set <stat> <weight>
Sets a specific stat weight (crit, haste, mastery, vers) for the bis list and dungeon details.
<img width="140" height="20" alt="image" src="https://github.com/user-attachments/assets/f9c1b790-630d-4b75-b86b-744eb0065695" />

## /mle getbislist
Gets the sorted list of items for each slot in all M+ dungeons for the season and weights them based on your secondary weights. (NOTE: Stat weights are arbitrarily set in code. See secondaryStatWeights in SlashCommands.lua)
<img width="625" height="1086" alt="image" src="https://github.com/user-attachments/assets/a55f8b4b-beb9-4be3-b813-a43c871b096a" />

## /mle getdungeondetails (MUST BE RUN AFTER /mle getbislist SO EQUIPMENT IS GENERATED)
Shows details about each dungeon such as: Dungeon Score, BIS Count, Bad Item Count and Decent Item Count.
<img width="280" height="862" alt="image" src="https://github.com/user-attachments/assets/53af3241-52f0-43d4-baf1-12da68c78e60" />



# Learnings
## Pre-scaled weights
When you retrieve item stats from any item, you don't get the actual stat value on an item. You get what is eventually scaled up based on the items item level. An item might have Crit = 1, Vers = 1, which means that item will always have equal crit vers as it scales up. If an item has Crit = 5, Mastery = 3, the item will have more crit than mastery in a ratio similar to 5:3. You can still extrapolate a normalized value from the item to compare against others.

## Mythic difficulty is 23
For whatever reason, Normal is 1, Heroic is 2, Mythic is 23??!? Calling EJ_SetDifficulty(23) will keep things more consistent.

# NOTES
## No Trinkets
I don't include trinkets because that is a ton of effort and players should know what trinkets they want to target. This does alter the overall dungeon score as a dungeon like Windrunner Spire has 2 bad trinkets for hunter but they aren't added to the bad count list.
