
var oSources = {
  "PHB": {
    "en": {
      "title": "Palyers Handbook"
    },
    "ru": {
      "title": "Книга игрока"
    }
  },
  "DMG": {
    "en": {
      "title": "Dungeon Master Guide"
    },
    "ru": {
      "title": "Книга мастера"
    }
  }
}
var oTypes = {
  "armor": {
    "en": {
      "title": "armor"
    },
    "ru": {
      "title": "броня",
      "gender": "she"
    }
  },
  "weapon": {
    "en": {
      "title": "weapon"
    },
    "ru": {
      "title": "оружие",
      "gender": "it"
    }
  },
  "stuff": {
    "en": {
      "title": "stuff"
    },
    "ru": {
      "title": "жезл",
      "gender": "he"
    }
  },
  "ring": {
    "en": {
      "title": "ring"
    },
    "ru": {
      "title": "кольцо",
      "gender": "it"
    }
  },
  "potion": {
    "en": {
      "title": "potion"
    },
    "ru": {
      "title": "зелье",
      "gender": "it"
    }
  },
  "wondrous item": {
    "en": {
      "title": "wondrous item"
    },
    "ru": {
      "title": "Чудо-вещь",
      "gender": "she"
    }
  },
  "vehicle": {
    "en": {
      "title": "vehicle"
    },
    "ru": {
      "title": "транспорт",
      "gender": "he"
    }
  }
}
var oRarity = {
  0: {
    "en": {
      "title": "Common"
    },
    "ru": {
      "he": "обычный",
      "she": "обычная",
      "it": "обычное",
      "title": "обычная"
    }
  },
  1: {
    "en": {
      "title": "uncommon"
    },
    "ru": {
      "he": "необычный",
      "it": "необычное",
      "title": "необычная"
    }
  },
  2: {
    "en": {
      "title": "Rare"
    },
    "ru": {
      "he": "редкий",
      "she": "редкая",
      "it": "редкое",
      "title": "редкая"
    }
  },
  3: {
    "en": {
      "title": "very Rare"
    },
    "ru": {
      "he": "очень редкий",
      "she": "очень редкая",
      "it": "очень редкое",
      "title": "очень редкая"
    }
  },
  4: {
    "en": {
      "title": "legendary"
    },
    "ru": {
      "he": "легендарный",
      "she": "легендарная",
      "it": "легендарное",
      "title": "легендарная"
    }
  }
}
var allItems = [
  {
    "en": {
      "name": "Adamantine Armor",
      "img": "adamantine_armor.jpeg",
      "type": "armor",
      "typeAdditions": "medium or heavy, but not hide",
      "rarity": 1,
      "attunement": "",
      "notes": "",
      "text": "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you’re wearing it, any critical hit against you becomes a normal hit.",
      "source": "DMG",
      "sourcePage": "150"
    },
    "ru": {
      "name": "Адамантиновая броня",
      "attunement": "",
      "notes": "",
      "text": "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you’re wearing it, any critical hit against you becomes a normal hit.",
    }
  },
  {
    "en": {
      "name": "ALCHEMY jUG",
      "img": "",
      "type": "wondrous item",
      "typeAdditions": "medium or heavy, but not hide",
      "rarity": 1,
      "attunement": "",
      "notes": "",
      "text": "<p>This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty.</p><p>You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named.</p><p>Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.",
      "source": "DMG",
      "sourcePage": "150"
    },
    "ru": {
      "name": "",
      "attunement": "",
      "notes": "",
      "text": "",
    }
  }
]
