angular.module('plantMasters').service('mainSearchService', function($http, $q, $rootScope) {
  this.currentHardinessZones;
  $rootScope.plants = [];
  this.manageCurrentZones = function(aNum) {
      if (this.currentHardinessZones === aNum) {
          this.currentHardinessZones = undefined;
          this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected)
      }
      else {
        this.currentHardinessZones = aNum
        console.log(this.currentHardinessZones);
        this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected)
      }
  };
  this.medicalSelected = [];
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
        console.log(this.edibleSelected);
        this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected);
      }
    }
    if (!found) {
        console.log(this.edibleSelected);
      this.edibleSelected.push(use);
      this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected);
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

     this.findPlants = function(z, o, m, e) {
         console.log('ON MY WAY');
         console.log(z, o, m, e);
         return $http({
             method: 'PUT',
             url: '/plants',
             data: {zone: z, other: o, medical: m, edible: e}
         }).then(function(response) {
             $rootScope.plants = response.data;
             console.log($rootScope.plants);
             //need to push to this.plants   
         })
     }



this.finalMedicalArrayOuter = [];
  this.addMedicalSpecific = function() {
     this.finalMedicalArray = [];
     this.finalMedicalArrayOuter = this.finalMedicalArray;

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
    var infectious = ['Antiperiodic', 'Antiscrophulatic', 'TB', 'VD'];
    var liver = ['Antibilious', 'Cholagogue', 'Diuretic', 'Haemostatic', 'Hepatic', 'Kidney', 'Lithontripic'];
    var nerves = ['Antispasmodic', 'Nervine'];
    var otherMed = ['Antidandruff', 'Antihydrotic', 'Antiphlogistic', 'Antivinous', 'Appetizer', 'Aromatic', 'Astringent', 'Bitter', 'Deodorant', 'Diaphoretic', 'Emollient', 'Enuresis', 'Hallucinogenic', 'Hypnotic', 'Irritant', 'Miscellany', 'Refrigerant', 'Restorative', 'Rubefacient',
      'Sedative', 'Stimulant'
    ];
    var pain = ['Anaesthetic', 'Analgesic', 'Anodyne', 'Lenitive', 'Narcotic'];
    var sex = ['Abortifacient', 'Anaphrodisiac', 'Aphrodisiac', 'Birthing aid', 'Contraceptive', 'Emmenagogue', 'Galactofuge', 'Galactogogue', 'Infertility', 'Oxytoxic', 'Uterine tonic', "Women's complaints"];
    var skin = ['Acrid', 'Antidermatosic', 'Antipruritic', 'Foot care', 'Skin', 'Vesicant'];
    var stomach = ['Antacid', 'Antiemetic', 'Digestive', 'Emetic', 'Stomachic'];
    var wounds = ['Antiecchymotic', 'Antiseptic', 'Detergent', 'Disinfectant', 'Plaster', 'Poultice', 'Salve', 'Styptic', 'Vulnerary'];
    var wholeBody = ['Adaptogen', 'Deobstruent', 'Depurative'];

    for (var i = 0; i < this.medicalSelected.length; i++) {
      if (this.medicalSelected[i] === "Alternative Medicine") {
        for (var j = 0; j < alternativeMed.length; j++) {
          this.finalMedicalArray.push(alternativeMed[j]);
        }
      }
      if (this.medicalSelected[i] === "Bacteria/Viruses/Fungi/Parasites") {
        for (var j = 0; j < bacteria.length; j++) {
          this.finalMedicalArray.push(bacteria[j]);
        }
      }
      if (this.medicalSelected[i] === "Bites/Stings") {
        for (var j = 0; j < bites.length; j++) {
          this.finalMedicalArray.push(bites[j]);
        }
      }
      if (this.medicalSelected[i] === "Bones") {
        for (var j = 0; j < bones.length; j++) {
          this.finalMedicalArray.push(bones[j]);
        }
      }
      if (this.medicalSelected[i] === "Bowels/Bladder") {
        for (var j = 0; j < bowels.length; j++) {
          this.finalMedicalArray.push(bowels[j]);
        }
      }
      if (this.medicalSelected[i] === "Cancer") {
        for (var j = 0; j < cancer.length; j++) {
          this.finalMedicalArray.push(cancer[j]);
        }
      }
      if (this.medicalSelected[i] === "Chest/Lungs") {
        for (var j = 0; j < chest.length; j++) {
          this.finalMedicalArray.push(chest[j]);
        }
      }
      if (this.medicalSelected[i] === "Ear/Nose/Throat/Eyes") {
        for (var j = 0; j < ear.length; j++) {
          this.finalMedicalArray.push(ear[j]);
        }
      }
      if (this.medicalSelected[i] === "Fevers") {
        for (var j = 0; j < fevers.length; j++) {
          this.finalMedicalArray.push(fevers[j]);
        }
      }
      if (this.medicalSelected[i] === "General Well Being") {
        for (var j = 0; j < general.length; j++) {
          this.finalMedicalArray.push(general[j]);
        }
      }
      if (this.medicalSelected[i] === "Heart/Blood") {
        for (var j = 0; j < heart.length; j++) {
          this.finalMedicalArray.push(heart[j]);
        }
      }
      if (this.medicalSelected[i] === "Infectious Diseases") {
        for (var j = 0; j < infectious.length; j++) {
          this.finalMedicalArray.push(infectious[j]);
        }
      }
      if (this.medicalSelected[i] === "Liver/Kidneys") {
        for (var j = 0; j < liver.length; j++) {
          this.finalMedicalArray.push(liver[j]);
        }
      }
      if (this.medicalSelected[i] === "Nerves/Muscles") {
        for (var j = 0; j < nerves.length; j++) {
          this.finalMedicalArray.push(nerves[j]);
        }
      }
      if (this.medicalSelected[i] === "Other") {
        for (var j = 0; j < otherMed.length; j++) {
          this.finalMedicalArray.push(otherMed[j]);
        }
      }
      if (this.medicalSelected[i] === "Pain Relief") {
        for (var j = 0; j < pain.length; j++) {
          this.finalMedicalArray.push(pain[j]);
        }
      }
      if (this.medicalSelected[i] === "Sex/Reproduction") {
        for (var j = 0; j < sex.length; j++) {
          this.finalMedicalArray.push(sex[j]);
        }
      }
      if (this.medicalSelected[i] === "Skin/Hands/Feet") {
        for (var j = 0; j < skin.length; j++) {
          this.finalMedicalArray.push(skin[j]);
        }
      }
      if (this.medicalSelected[i] === "Stomach") {
        for (var j = 0; j < stomach.length; j++) {
          this.finalMedicalArray.push(stomach[j]);
        }
      }
      if (this.medicalSelected[i] === "Wounds/Bruises") {
        for (var j = 0; j < wounds.length; j++) {
          this.finalMedicalArray.push(wounds[j]);
        }
      }
      if (this.medicalSelected[i] === "Whole Body") {
        for (var j = 0; j < wholeBody.length; j++) {
          this.finalMedicalArray.push(wholeBody[j]);
        }
      }
    }
     //console.log('Line 201 ' + this.finalMedicalArray);
     //console.log('OUTER' + this.finalMedicalArrayOuter);
     this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected);
    return this.finalMedicalArray;
  }

  this.finalOtherArrayOuter = [];
  this.addOtherSpecific = function() {
    this.finalOtherArray = [];
    this.finalOtherArrayOuter = this.finalOtherArray;

    var building = ['Insulation', 'Pipes', 'Pitch', 'Plaster', 'Roofing', 'Thatching'];
    var clothing = ['Buttons', 'Darning ball', 'Fibre', 'Latex', 'Leather', 'Needles', 'Pins', 'Raffia', 'Starch', 'Stuffing', 'Tannin', 'Weaving'];
    var dyes = ['Blotting paper', 'Dye', 'Ink', 'Mordant', 'Paint', 'Paper', 'Pencil', 'Size'];
    var fertilizer = ['Compost', 'Fertilizer', 'Green manure', 'Liquid feed', 'Potash'];
    var fire = ['Alcohol', 'Biomass', 'Charcoal', 'Friction sticks', 'Fuel', 'Kindling', 'Lighting', 'Oil', 'Tinder', 'Wax', 'Wick'];
    var bathroom = ['Baby care', 'Cleanser', 'Cosmetic', 'Cotton wool', 'Deodorant', 'Disinfectant', 'Essential', 'Hair', 'Resin', 'Soap', 'Soap making', 'Teeth'];
    var garden = ['Fencing', 'Fire retardant', 'Hedge', 'Mulch', 'Pioneer', 'Plant breeding', 'Plant support', 'Rooting hormone', 'Rootstock', 'Shelterbelt', 'Soil conditioner', 'Soil reclamation', 'Soil stabilization'];
    var home = ['Bedding', 'Besom', 'Brush', 'Incense', 'Lining', 'Packing', 'Porcelain', 'Pot-pourri', 'Scourer', 'Strewing', 'String'];
    var kitchen = ['Bottles', 'Containers', 'Cork', 'Filter', 'Fruit ripening', 'Gum', 'Pectin', 'Straw', 'Waxed paper'];
    var other = ['Broom', 'Litmus', 'Microscope', 'Miscellany', 'Musical', 'Pollution', 'Repellent', 'Weather forecasting', 'Weather protection'];
    var pesticides = ['Fungicide', 'Herbicide', 'Insecticide', 'Parasiticide'];
    var woodwork = ['Adhesive', 'Basketry', 'Beads', 'Furniture', 'Lacquer', 'Nails', 'Polish', 'Preservative', 'Rust', 'Sandpaper', 'Varnish', 'Waterproofing', 'Wood'];

    for (var i = 0; i < this.otherSelected.length; i++) {
      if (this.otherSelected[i] === "Building") {
        for (var j = 0; j < building.length; j++) {
          this.finalOtherArray.push(building[j]);
        }
      }
      if (this.otherSelected[i] === "Clothing") {
        for (var j = 0; j < clothing.length; j++) {
          this.finalOtherArray.push(clothing[j]);
        }
      }
      if (this.otherSelected[i] === "Dyes/Paints/Ink/Paper") {
        for (var j = 0; j < dyes.length; j++) {
          this.finalOtherArray.push(dyes[j]);
        }
      }
      if (this.otherSelected[i] === "Fertilizers") {
        for (var j = 0; j < fertilizer.length; j++) {
          this.finalOtherArray.push(fertilizer[j]);
        }
      }
      if (this.otherSelected[i] === "Fire/Lighting") {
        for (var j = 0; j < fire.length; j++) {
          this.finalOtherArray.push(fire[j]);
        }
      }
      if (this.otherSelected[i] === "Bathroom") {
        for (var j = 0; j < bathroom.length; j++) {
          this.finalOtherArray.push(bathroom[j]);
        }
      }
      if (this.otherSelected[i] === "Garden") {
        for (var j = 0; j < garden.length; j++) {
          this.finalOtherArray.push(garden[j]);
        }
      }
      if (this.otherSelected[i] === "Home") {
        for (var j = 0; j < home.length; j++) {
          this.finalOtherArray.push(home[j]);
        }
      }
      if (this.otherSelected[i] === "Kitchen") {
        for (var j = 0; j < kitchen.length; j++) {
          this.finalOtherArray.push(kitchen[j]);
        }
      }
      if (this.otherSelected[i] === "Other") {
        for (var j = 0; j < other.length; j++) {
          this.finalOtherArray.push(other[j]);
        }
      }
      if (this.otherSelected[i] === "Pesticides") {
        for (var j = 0; j < pesticides.length; j++) {
          this.finalOtherArray.push(pesticides[j]);
        }
      }
      if (this.otherSelected[i] === "Woodwork/Crafts") {
        for (var j = 0; j < woodwork.length; j++) {
          this.finalOtherArray.push(woodwork[j]);
        }
      }

    }
    //console.log('Line 209 ' + this.finalOtherArray);
    //console.log('OUTER OTHER' + this.finalOtherArrayOuter)
    this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected);
    return this.finalOtherArray;
  }

    //FOUR ARRAYS WE NEED TO SEND TO BACKEND
  //finalMedicalArray
  //finalOtherArray
  //edibleSelected
  //currentHardinessZones

})
