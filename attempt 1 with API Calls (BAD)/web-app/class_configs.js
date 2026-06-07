const classConfig = {
  Warrior: {
    Arms: {
      armor: ["Plate"],
      weapons: ["Two-Hand Sword", "Two-Hand Axe", "Two-Hand Mace", "Polearm"],
      required: ["Strength"],
      preferred: ["Critical Strike", "Mastery", "Haste"]
    },
    Fury: {
      armor: ["Plate"],
      weapons: ["One-Hand Sword", "One-Hand Axe", "One-Hand Mace", "Two-Hand Sword", "Two-Hand Axe", "Two-Hand Mace"],
      required: ["Strength"],
      preferred: ["Haste", "Critical Strike", "Mastery"]
    },
    Protection: {
      armor: ["Plate"],
      weapons: ["Sword", "Axe", "Mace", "Shield"],
      required: ["Strength"],
      preferred: ["Versatility", "Haste", "Mastery"]
    }
  },

  DemonHunter: {
    Vengeance: {
      armor: ["Leather"],
      weapons: ["One-Hand Warglaives", "One-Hand Sword", "One-Hand Axe"],
      required: ["Haste", "Critical Strike"],
      preferred: ["Versatility", "Mastery"]
    },
    Havoc: {
      armor: ["Leather"],
      weapons: ["One-Hand Warglaives", "One-Hand Sword", "One-Hand Axe"],
      required: ["Critical Strike"],
      preferred: ["Haste", "Mastery"]
    },
    Devourer: {
      armor: ["Leather"],
      weapons: ["One-Hand Warglaives", "One-Hand Sword", "One-Hand Axe"],
      required: ["Mastery", "Haste"],
      preferred: ["Critical Strike"]
    }
  },

  Paladin: {
    Holy: {
      armor: ["Plate"],
      weapons: ["Sword", "Mace", "Shield"],
      required: ["Intellect"],
      preferred: ["Critical Strike", "Haste", "Mastery"]
    },
    Protection: {
      armor: ["Plate"],
      weapons: ["Sword", "Mace", "Shield"],
      required: ["Strength"],
      preferred: ["Versatility", "Haste", "Mastery"]
    },
    Retribution: {
      armor: ["Plate"],
      weapons: ["Two-Hand Sword", "Two-Hand Mace", "Two-Hand Axe"],
      required: ["Strength"],
      preferred: ["Mastery", "Critical Strike", "Haste"]
    }
  },

  Hunter: {
    BeastMastery: {
      armor: ["Mail"],
      weapons: ["Ranged Bow", "Ranged Gun", "Ranged Crossbow"],
      required: ["Mastery", "Critical Strike"],
      preferred: ["Haste"]
    },
    Marksmanship: {
      armor: ["Mail"],
      weapons: ["Ranged Bow", "Ranged Gun", "Ranged Crossbow"],
      required: ["Mastery", "Critical Strike"],
      preferred: ["Haste"]
    },
    Survival: {
      armor: ["Mail"],
      weapons: ["Two-Hand Polearm", "Two-Hand Staff", "One-Hand Axe", "One-Hand Sword", "One-Hand Fist Weapon", "One-Hand Dagger"],
      required: ["Mastery", "Critical Strike"],
      preferred: ["Haste"]
    }
  },

  Rogue: {
    Assassination: {
      armor: ["Leather"],
      weapons: ["Dagger"],
      required: ["Agility"],
      preferred: ["Mastery", "Critical Strike", "Haste"]
    },
    Outlaw: {
      armor: ["Leather"],
      weapons: ["Sword", "Dagger", "Fist Weapon"],
      required: ["Agility"],
      preferred: ["Haste", "Critical Strike", "Versatility"]
    },
    Subtlety: {
      armor: ["Leather"],
      weapons: ["Dagger"],
      required: ["Agility"],
      preferred: ["Mastery", "Critical Strike", "Haste"]
    }
  },

  Priest: {
    Holy: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger", "Mace"],
      required: ["Intellect"],
      preferred: ["Haste", "Critical Strike", "Mastery"]
    },
    Discipline: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger", "Mace"],
      required: ["Intellect"],
      preferred: ["Mastery", "Haste", "Critical Strike"]
    },
    Shadow: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Haste", "Critical Strike", "Mastery"]
    }
  },

  DeathKnight: {
    Blood: {
      armor: ["Plate"],
      weapons: ["Two-Hand Sword", "Two-Hand Axe", "Two-Hand Mace", "Polearm"],
      required: ["Critical Strike"],
      preferred: ["Mastery", "Versatility"]
    },
    Frost: {
      armor: ["Plate"],
      weapons: ["One-Hand Sword", "One-Hand Axe", "One-Hand Mace"],
      required: ["Strength"],
      preferred: ["Critical Strike", "Haste", "Mastery"]
    },
    Unholy: {
      armor: ["Plate"],
      weapons: ["Two-Hand Sword", "Two-Hand Axe", "Two-Hand Mace", "Polearm"],
      required: ["Mastery", "Critical Strike"],
      preferred: ["Haste"]
    }
  },

  Shaman: {
    Elemental: {
      armor: ["Mail"],
      weapons: ["Two-Hand Staff", "One-Hand Dagger", "One-Hand Mace", "Off-Hand Shield"],
      required: ["Mastery"],
      preferred: ["Haste", "Critical Strike"]
    },
    Enhancement: {
      armor: ["Mail"],
      weapons: ["One-Hand Dagger", "One-Hand Fist Weapon", "One-Hand Axe", "One-Hand Mace"],
      required: null,
      preferred: ["Haste", "Critical Strike", "Mastery"]
    },
    Restoration: {
      armor: ["Mail"],
      weapons: ["Two-Hand Staff", "One-Hand Dagger", "One-Hand Mace", "Off-Hand Shield"],
      required: ["Intellect"],
      preferred: ["Mastery", "Haste", "Critical Strike"]
    }
  },

  Mage: {
    Arcane: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Mastery", "Critical Strike", "Haste"]
    },
    Fire: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Critical Strike", "Haste", "Mastery"]
    },
    Frost: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Haste", "Mastery", "Critical Strike"]
    }
  },

  Warlock: {
    Affliction: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Haste", "Mastery", "Critical Strike"]
    },
    Demonology: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Mastery", "Haste", "Critical Strike"]
    },
    Destruction: {
      armor: ["Cloth"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Critical Strike", "Haste", "Mastery"]
    }
  },

  Monk: {
    Brewmaster: {
      armor: ["Leather"],
      weapons: ["Two-Hand Staff", "One-Hand Fist Weapon", "One-Hand Axe", "One-Hand Mace", "One-Hand Sword", "Two-Hand Polearm"],
      required: null,
      preferred: ["Versatility", "Critical Strike", "Mastery"]
    },
    Windwalker: {
      armor: ["Leather"],
      weapons: ["Two-Hand Staff", "One-Hand Fist Weapon", "One-Hand Axe", "One-Hand Mace", "One-Hand Sword", "Two-Hand Polearm"],
      required: ["Haste"],
      preferred: ["Critical Strike", "Mastery"]
    },
    Mistweaver: {
      armor: ["Leather"],
      weapons: ["Two-Hand Staff", "One-Hand Dagger", "One-Hand Mace"],
      required: ["Haste", "Critical Strike"],
      preferred: ["Versatility"]
    }
  },

  Druid: {
    Balance: {
      armor: ["Leather"],
      weapons: ["Two-Hand Staff", "One-Hand Dagger", "One-Hand Mace"],
      required: ["Mastery", "Haste"],
      preferred: ["Critical Strike"]
    },
    Feral: {
      armor: ["Leather"],
      weapons: ["Two-Hand Staff", "Two-Hand Polearm"],
      required: ["Mastery", "Haste"],
      preferred: ["Critical Strike"]
    },
    Guardian: {
      armor: ["Leather"],
      weapons: ["Staff", "Polearm"],
      required: ["Haste", "Versatility"],
      preferred: ["Critical Strike", "Mastery"]
    },
    Restoration: {
      armor: ["Leather"],
      weapons: ["Two-Hand Staff", "One-Hand Dagger", "One-Hand Mace"],
      required: ["Haste", "Mastery"],
      preferred: ["Versatility", "Critical Strike"]
    }
  },

  Evoker: {
    Devastation: {
      armor: ["Mail"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Critical Strike", "Haste", "Mastery"]
    },
    Preservation: {
      armor: ["Mail"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Mastery", "Haste", "Critical Strike"]
    },
    Augmentation: {
      armor: ["Mail"],
      weapons: ["Staff", "Dagger"],
      required: ["Intellect"],
      preferred: ["Mastery", "Versatility", "Haste"]
    }
  }
};