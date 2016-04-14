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
    this.medicalSelected = ["Alternative Medicine"];
    this.manageMedicalSelected = function(use) {
        var found = false;
        for (var i = 0; i < this.medicalSelected.length; i++) {
            if (this.medicalSelected[i] === use) {
                found = true;
                this.medicalSelected.splice(i, 1);
            }
        }
        if (!found) {
            this.medicalSelected.push(use);
        }
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

this.alternativeMed = ['Alternative', 'Aromatherapy', 'Bach', 'Homeopathy'];
​
this.bacteria = ['Anthelmintic', 'Antibacterial', 'Antibiotic', 'Antifungal', 'Antiviral', 'Parasiticide', 'Vermifuge', 'Warts'];
​
this.bites = ['Antidote', 'Stings'];
​
this.bones = ['Antiarthritic', 'Antiinflammatory', 'Antirheumatic'];
​
this.bowels = ['Antihaemorrhoidal', 'Aperient', 'Carminative', 'Cathartic', 'Hydrogogue', 'Laxative', 'Purgative'];
​
this.cancer = ['Antitumor', 'Cancer', 'Cytostatic', 'Cytotoxic', 'Resolvent'];
​
this.chest = ['Antiasthmatic', 'Antitussive', 'Decongestant', 'Demulcent', 'Expectorant', 'Pectoral'];
​
this.ear = ['Errhine', 'Mouthwash', 'Mydriatic', 'Odontalgic', 'Ophthalmic', 'Sialagogue', 'Sternutatory'];
​
this.fevers = ['Antipyretic', 'Febrifuge'];
​
this.general = ['Antiscorbutic', 'Balsamic', 'Nutritive', 'Tonic'];
​
this.heart = ['Anticholesterolemic', 'Anticoagulant', 'Blood purifier', 'Blood tonic', 'Cardiac', 'Cardiotonic', 'Haemolytic', 'Hypoglycaemic', 'Hypotensive', 'Vasoconstrictor', 'Vasodilator'];
​
this.infectious = ['Antiperiodic', 'Antiscrophulatic' , 'TB', 'VD'];
​
this.liver = ['Antibilious', 'Cholagogue', 'Diuretic', 'Haemostatic', 'Hepatic', 'Kidney', 'Lithontripic'];
​
this.nerves = ['Antispasmodic', 'Nervine'];
​
this.otherMed = ['Antidandruff', 'Antihydrotic', 'Antiphlogistic', 'Antivinous', 'Appetizer', 'Aromatic', 'Astringent', 'Bitter', 'Deodorant', 'Diaphoretic', 'Emollient', 'Enuresis', 'Hallucinogenic', 'Hypnotic', 'Irritant', 'Miscellany', 'Refrigerant', 'Restorative', 'Rubefacient', 'Sedative', 'Stimulant'];
​
this.pain = ['Anaesthetic', 'Analgesic', 'Anodyne', 'Lenitive', 'Narcotic'];
​
this.sex = ['Abortifacient', 'Anaphrodisiac', 'Aphrodisiac', 'Birthing aid', 'Contraceptive', 'Emmenagogue', 'Galactofuge', 'Galactogogue', 'Infertility', 'Oxytoxic', 'Uterine tonic', "Women's complaints"];
​
this.skin = ['Acrid', 'Antidermatosic', 'Antipruritic', 'Foot care', 'Skin', 'Vesicant'];
​
this.stomach = ['Antacid', 'Antiemetic', 'Digestive', 'Emetic', 'Stomachic'];
​
this.wounds = ['Antiecchymotic', 'Antiseptic', 'Detergent', 'Disinfectant', 'Plaster', 'Poultice', 'Salve', 'Styptic', 'Vulnerary'];
​
this.wholeBody = ['Adaptogen', 'Deobstruent', 'Depurative'];


//loop through medicalSelected
this.finalSelectedArray = [];

for (var i = 0; i < this.medicalSelected.length; i++) {
  if (i === "Alternative Medicine") {
    for (var i = 0; i < this.alternativeMed.length; i++) {
      this.finalSelectedArray.push(i);
    }
    //loop through AM array, push i to finalSelectedArray
  }
  if (i === "Bacteria/Viruses/Fungi/Parasites") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Bites/Stings") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Bones") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Bowels/Bladder") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Cancer") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Chest/Lungs") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Ear/Nose/Throat/Eyes") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Fevers") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "General Well Being") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Heart/Blood") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Infectious Diseases") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Liver/Kidneys") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Nerves/Muscles") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Other") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Pain Relief") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Sex/Reproduction") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Skin/Hands/Feet") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Stomach") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Wounds/Bruises") {
    //loop through, push i to finalSelectedArray
  }
  if (i === "Whole Body") {
    //loop through, push i to finalSelectedArray
  }
}

//loop through edibleSelected

for (var i = 0; i < this.edibleSelected.length; i++) {
  if (i === "Chocolate") {
    //loop through, push to final
  }
  if (i === "Coffee") {
    //loop through, push to final
  }
  if (i === "Coloring") {
    //loop through, push to final
  }
  if (i === "Condiment") {
    //loop through, push to final
  }
  if (i === "Curdling") {
    //loop through, push to final
  }
  if (i === "Drink") {
    //loop through, push to final
  }
  if (i === "Egg") {
    //loop through, push to final
  }
  if (i === "Gelatine") {
    //loop through, push to final
  }
  if (i === "Gum") {
    //loop through, push to final
  }
  if (i === "Milk") {
    //loop through, push to final
  }
  if (i === "Oil") {
    //loop through, push to final
  }
  if (i === "Pectin") {
    //loop through, push to final
  }
  if (i === "Rutin") {
    //loop through, push to final
  }
  if (i === "Salt") {
    //loop through, push to final
  }
  if (i === "Stabilizer") {
    //loop through, push to final
  }
  if (i === "Sweetener") {
    //loop through, push to final
  }
  if (i === "Tea") {
    //loop through, push to final
  }
}

//loop through otherSelected
for (var i = 0; i < this.otherSelected.length; i++) {
  if (i === "Building") {
    //loop through, push to final
  }
  if (i === "Clothing") {
    //loop through, push to final
  }
  if (i === "Dyes/Paints/Ink/Paper") {
    //loop through, push to final
  }
  if (i === "Fertilizers") {
    //loop through, push to final
  }
  if (i === "Fire/Lightning") {
    //loop through, push to final
  }
  if (i === "Bathroom") {
    //loop through, push to final
  }
  if (i === "Garden") {
    //loop through, push to final
  }
  if (i === "Home") {
    //loop through, push to final
  }
  if (i === "Kitchen") {
    //loop through, push to final
  }
  if (i === "Other") {
    //loop through, push to final
  }
  if (i === "Pesticides") {
    //loop through, push to final
  }
  if (i === "Woodwork/Crafts") {
    //loop through, push to final
  }
}


})
