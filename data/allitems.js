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

var oItemsAddInfo = {
  "requires attunement": {
    "en": "requires attunement",
    "ru": "требуется настройка"
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
      "typeAdditions": "только средня или тяжелая",
      "attunement": "",
      "notes": "",
      "text": "Это доспехи усилены адамантином, одним из самых прочных из существующих веществ. Пока вы носите эти доспехи, все критические попадания по вам считаются обычными попаданиями.",
    }
  },
  {
    "en": {
      "name": "ALCHEMY jUG",
      "img": "",
      "type": "wondrous item",
      "rarity": 1,
      "attunement": "",
      "notes": "",
      "text": "<p>This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty.</p><p>You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named.</p><p>Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.",
      "source": "DMG",
      "sourcePage": "150"
    },
    "ru": {
      "name": "Алхимический сосуд",
      "notes": "",
      "text": "<p>Этот керамический кувшин, кажется способным вместить 1 галлон жидкости и весит 12 фунтов вне зависимости от того, полный он или пустой. Если его потрясти, то можно услышать звуки плескающийся жидкости, даже если кувшин пуст.</p><p>Вы можете действием назвать одну жидкость из приведённой ниже таблицы, отчего кувшин начнёт её производить. После этого вы можете ещё одним действием откупорить кувшин и вылить эту жидкость из сосуда со скоростью до 2 галлонов в минуту. Максимальное количество жидкости, которое может произвести кувшин, зависит от вида жидкости, названной вами.</p><p>После того, как кувшин начинает производить выбранную жидкость, он не может производить другую, или произвести названную жидкость в объёме больше её максимума, пока не наступит следующий рассвет.</p><ul><li>Вино: 1 галлон </li><li>Вода, пресная: 8 галлонов </li><li>Вода, солёная: 12 галлонов </li><li>Кислота: 8 унций </li><li>Масло: 1 кварта</li><li>Майонез: 2 галлона </li><li>Мёд: 1 галлон</li><li>Пиво: 4 галлона</li><li>Уксус: 2 галлона</li><li>Яд 1/2: унции</li></ul>",
    }
  },
  {
    "en": {
      "name": "AMMUNITION +1",
      "img": "",
      "type": "weapon",
      "rarity": 1,
      "attunement": "",
      "notes": "",
      "text": "You have a bonus to attack and damage rolls madewith this piece of magic ammunition. The bonus isdetermined by the rarity of the ammunition. Once it hita target, the ammunition is no longer magical.",
      "source": "DMG",
      "sourcePage": "150"
    },
    "ru": {
      "name": "Боеприпас +1",
      "notes": "",
      "text": "Вы получаете бонус +1 к броскам атаки и урона, совершённым при использовании этих магических боеприпасов. Попав в цель, боеприпас перестаёт быть магическим.",
    }
  },
  {
    "en": {
      "name": "AMMUNITION +2",
      "img": "",
      "type": "weapon",
      "rarity": 2,
      "attunement": "",
      "notes": "",
      "text": "You have a bonus to attack and damage rolls madewith this piece of magic ammunition. The bonus isdetermined by the rarity of the ammunition. Once it hita target, the ammunition is no longer magical.",
      "source": "DMG",
      "sourcePage": "150"
    },
    "ru": {
      "name": "Боеприпас +2",
      "notes": "",
      "text": "Вы получаете бонус +2 к броскам атаки и урона, совершённым при использовании этих магических боеприпасов. Попав в цель, боеприпас перестаёт быть магическим.",
    }
  },
  {
    "en": {
      "name": "AMMUNITION +3",
      "img": "",
      "type": "weapon",
      "rarity": 3,
      "attunement": "",
      "notes": "",
      "text": "You have a bonus to attack and damage rolls madewith this piece of magic ammunition. The bonus isdetermined by the rarity of the ammunition. Once it hita target, the ammunition is no longer magical.",
      "source": "DMG",
      "sourcePage": "150"
    },
    "ru": {
      "name": "Боеприпас +3",
      "notes": "",
      "text": "Вы получаете бонус +3 к броскам атаки и урона, совершённым при использовании этих магических боеприпасов. Попав в цель, боеприпас перестаёт быть магическим.",
    }
  }
]
