angular.module('plantMasters').service('mainSearchService', function($http, $q, $rootScope) {
    this.currentHardinessZones = ['1', '2'];
    $rootScope.plants = this.currentHardinessZones;
    this.manageCurrentZones = function(aNum) {
        var found = false
        for (var i = 0; i < this.currentHardinessZones.length; i++) {
            if (this.currentHardinessZones[i] === aNum) {
                found = true;
                this.currentHardinessZones.splice(i, 1);
            }
        }
        if (!found) {
            this.currentHardinessZones.push(aNum);
        }
        //invoke function here
    };
    this.medicalSelected = [];
    this.manageMedicalSelected = function(use) {
        var found = false;
        for (var i = 0; i < this.medicalSelected.length; i++) {
            if (this.medicalSelected[i] === use) {
                found = true;
                this.removeMedicalSpecific(use);
                this.medicalSelected.splice(i, 1);
            }
        }
        if (!found) {
            this.addMedicalSpecific();
            this.medicalSelected.push(use);
        }
          console.log('Line 31 ' + this.medicalSelected);
    };
    this.edibleSelected = [];
    this.manageEdibleSelect = function(use) {
       var found = false;
       for (var i = 0; i < this.edibleSelected.length; i++) {
           if (this.edibleSelected[i] === use) {
               found = true;
               this.edibleSelected.splice(i, 1);
           }
       }
       if (!found) {
           this.edibleSelected.push(use);
       }
   };
   this.otherSelected = [];
   this.manageOtherSelect = function(use) {
       var found = false;
       for (var i = 0; i < this.otherSelected.length; i++) {
           if (this.otherSelected[i] === use) {
               found = true;
               this.otherSelected.splice(i, 1);
           }
       }
       if (!found) {
           this.otherSelected.push(use);
       }
   };

//    this.findPlants = function() {
//        return $http({
//            method: 'GET',
//            url: '/findPlants/' +
//        })
//    }



//loop through medicalSelected

//WRAP THEEEES IN A function
//call that function after array is updated in manage____Selected function
//call another function to send get with finalSlectedArray

this.finalSelectedArray = [];

this.addMedicalSpecific = function() {

  var alternativeMed = ['Alternative', 'Aromatherapy', 'Bach', 'Homeopathy'];
  var bacteria = ['Anthelmintic', 'Antibacterial', 'Antibiotic', 'Antifungal', 'Antiviral', 'Parasiticide', 'Vermifuge', 'Warts'];
  var bites = ['Antidote', 'Stings'];
  var bones = ['Antiarthritic', 'Antiinflammatory', 'Antirheumatic'];
  var bowels = ['Antihaemorrhoidal', 'Aperient', 'Carminative', 'Cathartic', 'Hydrogogue', 'Laxative', 'Purgative'];
  var cancer = ['Antitumor', 'Cancer', 'Cytostatic', 'Cytotoxic', 'Resolvent'];
  var chest = ['Antiasthmatic', 'Antitussive', 'Decongestant', 'Demulcent', 'Expectorant', 'Pectoral'];
  var ear = ['Errhine', 'Mouthwash', 'Mydriatic', 'Odontalgic', 'Ophthalmic', 'Sialagogue', 'Sternutatory'];
  var fevers = ['Antipyretic', 'Febrifuge'];
  var general = ['Antiscorbutic', 'Balsamic', 'Nutritive', 'Tonic'];
  var heart = ['Anticholesterolemic', 'Anticoagulant', 'Blood purifier', 'Blood tonic', 'Cardiac', 'Cardiotonic', 'Haemolytic', 'Hypoglycaemic', 'Hypotensive', 'Vasoconstrictor', 'Vasodilator'];
  var infectious = ['Antiperiodic', 'Antiscrophulatic' , 'TB', 'VD'];
  var liver = ['Antibilious', 'Cholagogue', 'Diuretic', 'Haemostatic', 'Hepatic', 'Kidney', 'Lithontripic'];
  var nerves = ['Antispasmodic', 'Nervine'];
  var otherMed = ['Antidandruff', 'Antihydrotic', 'Antiphlogistic', 'Antivinous', 'Appetizer', 'Aromatic', 'Astringent', 'Bitter', 'Deodorant', 'Diaphoretic', 'Emollient', 'Enuresis', 'Hallucinogenic', 'Hypnotic', 'Irritant', 'Miscellany', 'Refrigerant', 'Restorative', 'Rubefacient',
  'Sedative', 'Stimulant'];
  var pain = ['Anaesthetic', 'Analgesic', 'Anodyne', 'Lenitive', 'Narcotic'];
  var sex = ['Abortifacient', 'Anaphrodisiac', 'Aphrodisiac', 'Birthing aid', 'Contraceptive', 'Emmenagogue', 'Galactofuge', 'Galactogogue', 'Infertility', 'Oxytoxic', 'Uterine tonic', "Women's complaints"];
  var skin = ['Acrid', 'Antidermatosic', 'Antipruritic', 'Foot care', 'Skin', 'Vesicant'];
  var stomach = ['Antacid', 'Antiemetic', 'Digestive', 'Emetic', 'Stomachic'];
  var wounds = ['Antiecchymotic', 'Antiseptic', 'Detergent', 'Disinfectant', 'Plaster', 'Poultice', 'Salve', 'Styptic', 'Vulnerary'];
  var wholeBody = ['Adaptogen', 'Deobstruent', 'Depurative'];

for (var i = 0; i < this.medicalSelected.length; i++) {
  if (this.medicalSelected[i] === "Alternative Medicine") {
    for (var j = 0; j < alternativeMed.length; j++) {
      this.finalSelectedArray.push(alternativeMed[j]);
    }
  }
  if (this.medicalSelected[i] === "Bacteria/Viruses/Fungi/Parasites") {
    for (var j = 0; j < bacteria.length; j++) {
      this.finalSelectedArray.push(bacteria[j]);
    }
  }
  if (this.medicalSelected[i] === "Bites/Stings") {
    for (var j = 0; j < bites.length; j++) {
      this.finalSelectedArray.push(bites[j]);
    }
  }
  if (this.medicalSelected[i] === "Bones") {
    for (var j = 0; j < bones.length; j++) {
      this.finalSelectedArray.push(bones[j]);
    }
  }
  if (this.medicalSelected[i] === "Bowels/Bladder") {
    for (var j = 0; j < bowels.length; j++) {
      this.finalSelectedArray.push(bowels[j]);
    }
  }
  if (this.medicalSelected[i] === "Cancer") {
    for (var j = 0; j < cancer.length; j++) {
      this.finalSelectedArray.push(cancer[j]);
    }
  }
  if (this.medicalSelected[i] === "Chest/Lungs") {
    for (var j = 0; j < chest.length; j++) {
      this.finalSelectedArray.push(chest[j]);
    }
  }
  if (this.medicalSelected[i] === "Ear/Nose/Throat/Eyes") {
    for (var j = 0; j < ear.length; j++) {
      this.finalSelectedArray.push(ear[j]);
    }
  }
  if (this.medicalSelected[i] === "Fevers") {
    for (var j = 0; j < fevers.length; j++) {
      this.finalSelectedArray.push(fevers[j]);
    }
  }
  if (this.medicalSelected[i] === "General Well Being") {
    for (var j = 0; j < general.length; j++) {
      this.finalSelectedArray.push(general[j]);
    }
  }
  if (this.medicalSelected[i] === "Heart/Blood") {
    for (var j = 0; j < heart.length; j++) {
      this.finalSelectedArray.push(heart[j]);
    }
  }
  if (this.medicalSelected[i] === "Infectious Diseases") {
    for (var j = 0; j < infectious.length; j++) {
      this.finalSelectedArray.push(infectious[j]);
    }
  }
  if (this.medicalSelected[i] === "Liver/Kidneys") {
    for (var j = 0; j < liver.length; j++) {
      this.finalSelectedArray.push(liver[j]);
    }
  }
  if (this.medicalSelected[i] === "Nerves/Muscles") {
    for (var j = 0; j < nerves.length; j++) {
      this.finalSelectedArray.push(nerves[j]);
    }
  }
  if (this.medicalSelected[i] === "Other") {
    for (var j = 0; j < otherMed.length; j++) {
      this.finalSelectedArray.push(otherMed[j]);
    }
  }
  if (this.medicalSelected[i] === "Pain Relief") {
    for (var j = 0; j < pain.length; j++) {
      this.finalSelectedArray.push(pain[j]);
    }
  }
  if (this.medicalSelected[i] === "Sex/Reproduction") {
    for (var j = 0; j < sex.length; j++) {
      this.finalSelectedArray.push(sex[j]);
    }
  }
  if (this.medicalSelected[i] === "Skin/Hands/Feet") {
    for (var j = 0; j < skin.length; j++) {
      this.finalSelectedArray.push(skin[j]);
    }
  }
  if (this.medicalSelected[i] === "Stomach") {
    for (var j = 0; j < stomach.length; j++) {
      this.finalSelectedArray.push(stomach[j]);
    }
  }
  if (this.medicalSelected[i] === "Wounds/Bruises") {
    for (var j = 0; j < wounds.length; j++) {
      this.finalSelectedArray.push(wounds[j]);
    }
  }
  if (this.medicalSelected[i] === "Whole Body") {
    for (var j = 0; j < wholeBody.length; j++) {
      this.finalSelectedArray.push(wholeBody[j]);
    }
  }
}
console.log('Line 209 ' + this.finalSelectedArray);
return this.finalSelectedArray;
}


this.removeMedicalSpecific = function() {
  var alternativeMed = ['Alternative', 'Aromatherapy', 'Bach', 'Homeopathy'];
  var bacteria = ['Anthelmintic', 'Antibacterial', 'Antibiotic', 'Antifungal', 'Antiviral', 'Parasiticide', 'Vermifuge', 'Warts'];
  var bites = ['Antidote', 'Stings'];
  var bones = ['Antiarthritic', 'Antiinflammatory', 'Antirheumatic'];
  var bowels = ['Antihaemorrhoidal', 'Aperient', 'Carminative', 'Cathartic', 'Hydrogogue', 'Laxative', 'Purgative'];
  var cancer = ['Antitumor', 'Cancer', 'Cytostatic', 'Cytotoxic', 'Resolvent'];
  var chest = ['Antiasthmatic', 'Antitussive', 'Decongestant', 'Demulcent', 'Expectorant', 'Pectoral'];
  var ear = ['Errhine', 'Mouthwash', 'Mydriatic', 'Odontalgic', 'Ophthalmic', 'Sialagogue', 'Sternutatory'];
  var fevers = ['Antipyretic', 'Febrifuge'];
  var general = ['Antiscorbutic', 'Balsamic', 'Nutritive', 'Tonic'];
  var heart = ['Anticholesterolemic', 'Anticoagulant', 'Blood purifier', 'Blood tonic', 'Cardiac', 'Cardiotonic', 'Haemolytic', 'Hypoglycaemic', 'Hypotensive', 'Vasoconstrictor', 'Vasodilator'];
  var infectious = ['Antiperiodic', 'Antiscrophulatic' , 'TB', 'VD'];
  var liver = ['Antibilious', 'Cholagogue', 'Diuretic', 'Haemostatic', 'Hepatic', 'Kidney', 'Lithontripic'];
  var nerves = ['Antispasmodic', 'Nervine'];
  var otherMed = ['Antidandruff', 'Antihydrotic', 'Antiphlogistic', 'Antivinous', 'Appetizer', 'Aromatic', 'Astringent', 'Bitter', 'Deodorant', 'Diaphoretic', 'Emollient', 'Enuresis', 'Hallucinogenic', 'Hypnotic', 'Irritant', 'Miscellany', 'Refrigerant', 'Restorative', 'Rubefacient',
  'Sedative', 'Stimulant'];
  var pain = ['Anaesthetic', 'Analgesic', 'Anodyne', 'Lenitive', 'Narcotic'];
  var sex = ['Abortifacient', 'Anaphrodisiac', 'Aphrodisiac', 'Birthing aid', 'Contraceptive', 'Emmenagogue', 'Galactofuge', 'Galactogogue', 'Infertility', 'Oxytoxic', 'Uterine tonic', "Women's complaints"];
  var skin = ['Acrid', 'Antidermatosic', 'Antipruritic', 'Foot care', 'Skin', 'Vesicant'];
  var stomach = ['Antacid', 'Antiemetic', 'Digestive', 'Emetic', 'Stomachic'];
  var wounds = ['Antiecchymotic', 'Antiseptic', 'Detergent', 'Disinfectant', 'Plaster', 'Poultice', 'Salve', 'Styptic', 'Vulnerary'];
  var wholeBody = ['Adaptogen', 'Deobstruent', 'Depurative'];

for (var i = 0; i < this.medicalSelected; i++) {
  if (this.medicalSelected[i] === "Alternative Medicine") {
    for (var j = 0; j < alternativeMed.length; j++) {
    this.finalSelectedArray.splice(alternativeMed[j], 1);
    if (this.medicalSelected[i] === "Bacteria/Viruses/Fungi/Parasites") {
      for (var j = 0; j < bacteria.length; j++) {
        this.finalSelectedArray.push(bacteria[j]);
      }
    }
  }
}
  if (this.medicalSelected[i] === "Bacteria/Viruses/Fungi/Parasites") {
    for (var j = 0; j < bacteria.length; j++) {
      this.finalSelectedArray.splice(bacteria[j], 1);
    }
  }
  }



  // console.log('Line 250 ' + this.finalSelectedArray);
  return this.finalSelectedArray;
}
//loop through edibleSelected
//
// for (var i = 0; i < this.edibleSelected.length; i++) {
//   if (i === "Chocolate") {
//     //loop through, push to final
//   }
//   if (i === "Coffee") {
//     //loop through, push to final
//   }
//   if (i === "Coloring") {
//     //loop through, push to final
//   }
//   if (i === "Condiment") {
//     //loop through, push to final
//   }
//   if (i === "Curdling") {
//     //loop through, push to final
//   }
//   if (i === "Drink") {
//     //loop through, push to final
//   }
//   if (i === "Egg") {
//     //loop through, push to final
//   }
//   if (i === "Gelatine") {
//     //loop through, push to final
//   }
//   if (i === "Gum") {
//     //loop through, push to final
//   }
//   if (i === "Milk") {
//     //loop through, push to final
//   }
//   if (i === "Oil") {
//     //loop through, push to final
//   }
//   if (i === "Pectin") {
//     //loop through, push to final
//   }
//   if (i === "Rutin") {
//     //loop through, push to final
//   }
//   if (i === "Salt") {
//     //loop through, push to final
//   }
//   if (i === "Stabilizer") {
//     //loop through, push to final
//   }
//   if (i === "Sweetener") {
//     //loop through, push to final
//   }
//   if (i === "Tea") {
//     //loop through, push to final
//   }
// }
//
// //loop through otherSelected
// for (var i = 0; i < this.otherSelected.length; i++) {
//   if (i === "Building") {
//     //loop through, push to final
//   }
//   if (i === "Clothing") {
//     //loop through, push to final
//   }
//   if (i === "Dyes/Paints/Ink/Paper") {
//     //loop through, push to final
//   }
//   if (i === "Fertilizers") {
//     //loop through, push to final
//   }
//   if (i === "Fire/Lightning") {
//     //loop through, push to final
//   }
//   if (i === "Bathroom") {
//     //loop through, push to final
//   }
//   if (i === "Garden") {
//     //loop through, push to final
//   }
//   if (i === "Home") {
//     //loop through, push to final
//   }
//   if (i === "Kitchen") {
//     //loop through, push to final
//   }
//   if (i === "Other") {
//     //loop through, push to final
//   }
//   if (i === "Pesticides") {
//     //loop through, push to final
//   }
//   if (i === "Woodwork/Crafts") {
//     //loop through, push to final
//   }
// }


})
