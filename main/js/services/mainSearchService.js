"use strict";

angular.module('plantMasters').service('mainSearchService', function ($http, $q, $rootScope) {
    // this.currentHardinessZones;
    $rootScope.plants = [];
    this.manageCurrentZones = function (aNum) {
        if (this.currentHardinessZones === aNum) {
            this.currentHardinessZones = undefined;
            this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected)
        }
        else {
            this.currentHardinessZones = aNum;
            console.log(this.currentHardinessZones);
            this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected)
        }
    };
    this.medicalSelected = [];
    this.manageMedicalSelected = function (use) {
        let found = false;
        for (let i = 0; i < this.medicalSelected.length; i++) {
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
    this.manageEdibleSelect = function (use) {
        let found = false;
        for (let i = 0; i < this.edibleSelected.length; i++) {
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
    this.manageOtherSelect = function (use) {
        let found = false;
        for (let i = 0; i < this.otherSelected.length; i++) {
            if (this.otherSelected[i] === use) {
                found = true;
                this.otherSelected.splice(i, 1);
            }
        }
        if (!found) {
            this.otherSelected.push(use);
        }
    };

    


    this.finalMedicalArrayOuter = [];
    this.addMedicalSpecific = function () {
        this.finalMedicalArray = [];
        this.finalMedicalArrayOuter = this.finalMedicalArray;

        let alternativeMed = ['Alternative', 'Aromatherapy', 'Bach', 'Homeopathy'];
        let bacteria = ['Anthelmintic', 'Antibacterial', 'Antibiotic', 'Antifungal', 'Antiviral', 'Parasiticide', 'Vermifuge', 'Warts'];
        let bites = ['Antidote', 'Stings'];
        let bones = ['Antiarthritic', 'Antiinflammatory', 'Antirheumatic'];
        let bowels = ['Antihaemorrhoidal', 'Aperient', 'Carminative', 'Cathartic', 'Hydrogogue', 'Laxative', 'Purgative'];
        let cancer = ['Antitumor', 'Cancer', 'Cytostatic', 'Cytotoxic', 'Resolvent'];
        let chest = ['Antiasthmatic', 'Antitussive', 'Decongestant', 'Demulcent', 'Expectorant', 'Pectoral'];
        let ear = ['Errhine', 'Mouthwash', 'Mydriatic', 'Odontalgic', 'Ophthalmic', 'Sialagogue', 'Sternutatory'];
        let fevers = ['Antipyretic', 'Febrifuge'];
        let general = ['Antiscorbutic', 'Balsamic', 'Nutritive', 'Tonic'];
        let heart = ['Anticholesterolemic', 'Anticoagulant', 'Blood purifier', 'Blood tonic', 'Cardiac', 'Cardiotonic', 'Haemolytic', 'Hypoglycaemic', 'Hypotensive', 'Vasoconstrictor', 'Vasodilator'];
        let infectious = ['Antiperiodic', 'Antiscrophulatic', 'TB', 'VD'];
        let liver = ['Antibilious', 'Cholagogue', 'Diuretic', 'Haemostatic', 'Hepatic', 'Kidney', 'Lithontripic'];
        let nerves = ['Antispasmodic', 'Nervine'];
        let otherMed = ['Antidandruff', 'Antihydrotic', 'Antiphlogistic', 'Antivinous', 'Appetizer', 'Aromatic', 'Astringent', 'Bitter', 'Deodorant', 'Diaphoretic', 'Emollient', 'Enuresis', 'Hallucinogenic', 'Hypnotic', 'Irritant', 'Miscellany', 'Refrigerant', 'Restorative', 'Rubefacient',
            'Sedative', 'Stimulant'
        ];
        let pain = ['Anaesthetic', 'Analgesic', 'Anodyne', 'Lenitive', 'Narcotic'];
        let sex = ['Abortifacient', 'Anaphrodisiac', 'Aphrodisiac', 'Birthing aid', 'Contraceptive', 'Emmenagogue', 'Galactofuge', 'Galactogogue', 'Infertility', 'Oxytoxic', 'Uterine tonic', "Women's complaints"];
        let skin = ['Acrid', 'Antidermatosic', 'Antipruritic', 'Foot care', 'Skin', 'Vesicant'];
        let stomach = ['Antacid', 'Antiemetic', 'Digestive', 'Emetic', 'Stomachic'];
        let wounds = ['Antiecchymotic', 'Antiseptic', 'Detergent', 'Disinfectant', 'Plaster', 'Poultice', 'Salve', 'Styptic', 'Vulnerary'];
        let wholeBody = ['Adaptogen', 'Deobstruent', 'Depurative'];

        for (let i = 0; i < this.medicalSelected.length; i++) {
            if (this.medicalSelected[i] === "Alternative Medicine") {
                for (let j = 0; j < alternativeMed.length; j++) {
                    this.finalMedicalArray.push(alternativeMed[j]);
                }
            }
            if (this.medicalSelected[i] === "Bacteria/Viruses/Fungi/Parasites") {
                for (let j = 0; j < bacteria.length; j++) {
                    this.finalMedicalArray.push(bacteria[j]);
                }
            }
            if (this.medicalSelected[i] === "Bites/Stings") {
                for (let j = 0; j < bites.length; j++) {
                    this.finalMedicalArray.push(bites[j]);
                }
            }
            if (this.medicalSelected[i] === "Bones") {
                for (let j = 0; j < bones.length; j++) {
                    this.finalMedicalArray.push(bones[j]);
                }
            }
            if (this.medicalSelected[i] === "Bowels/Bladder") {
                for (let j = 0; j < bowels.length; j++) {
                    this.finalMedicalArray.push(bowels[j]);
                }
            }
            if (this.medicalSelected[i] === "Cancer") {
                for (let j = 0; j < cancer.length; j++) {
                    this.finalMedicalArray.push(cancer[j]);
                }
            }
            if (this.medicalSelected[i] === "Chest/Lungs") {
                for (let j = 0; j < chest.length; j++) {
                    this.finalMedicalArray.push(chest[j]);
                }
            }
            if (this.medicalSelected[i] === "Ear/Nose/Throat/Eyes") {
                for (let j = 0; j < ear.length; j++) {
                    this.finalMedicalArray.push(ear[j]);
                }
            }
            if (this.medicalSelected[i] === "Fevers") {
                for (let j = 0; j < fevers.length; j++) {
                    this.finalMedicalArray.push(fevers[j]);
                }
            }
            if (this.medicalSelected[i] === "General Well Being") {
                for (let j = 0; j < general.length; j++) {
                    this.finalMedicalArray.push(general[j]);
                }
            }
            if (this.medicalSelected[i] === "Heart/Blood") {
                for (let j = 0; j < heart.length; j++) {
                    this.finalMedicalArray.push(heart[j]);
                }
            }
            if (this.medicalSelected[i] === "Infectious Diseases") {
                for (let j = 0; j < infectious.length; j++) {
                    this.finalMedicalArray.push(infectious[j]);
                }
            }
            if (this.medicalSelected[i] === "Liver/Kidneys") {
                for (let j = 0; j < liver.length; j++) {
                    this.finalMedicalArray.push(liver[j]);
                }
            }
            if (this.medicalSelected[i] === "Nerves/Muscles") {
                for (let j = 0; j < nerves.length; j++) {
                    this.finalMedicalArray.push(nerves[j]);
                }
            }
            if (this.medicalSelected[i] === "Other") {
                for (let j = 0; j < otherMed.length; j++) {
                    this.finalMedicalArray.push(otherMed[j]);
                }
            }
            if (this.medicalSelected[i] === "Pain Relief") {
                for (let j = 0; j < pain.length; j++) {
                    this.finalMedicalArray.push(pain[j]);
                }
            }
            if (this.medicalSelected[i] === "Sex/Reproduction") {
                for (let j = 0; j < sex.length; j++) {
                    this.finalMedicalArray.push(sex[j]);
                }
            }
            if (this.medicalSelected[i] === "Skin/Hands/Feet") {
                for (let j = 0; j < skin.length; j++) {
                    this.finalMedicalArray.push(skin[j]);
                }
            }
            if (this.medicalSelected[i] === "Stomach") {
                for (let j = 0; j < stomach.length; j++) {
                    this.finalMedicalArray.push(stomach[j]);
                }
            }
            if (this.medicalSelected[i] === "Wounds/Bruises") {
                for (let j = 0; j < wounds.length; j++) {
                    this.finalMedicalArray.push(wounds[j]);
                }
            }
            if (this.medicalSelected[i] === "Whole Body") {
                for (let j = 0; j < wholeBody.length; j++) {
                    this.finalMedicalArray.push(wholeBody[j]);
                }
            }
        }
        //console.log('Line 201 ' + this.finalMedicalArray);
        //console.log('OUTER' + this.finalMedicalArrayOuter);
        this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected);
        return this.finalMedicalArray;
    };

    this.finalOtherArrayOuter = [];
    this.addOtherSpecific = function () {
        this.finalOtherArray = [];
        this.finalOtherArrayOuter = this.finalOtherArray;

        let building = ['Insulation', 'Pipes', 'Pitch', 'Plaster', 'Roofing', 'Thatching'];
        let clothing = ['Buttons', 'Darning ball', 'Fibre', 'Latex', 'Leather', 'Needles', 'Pins', 'Raffia', 'Starch', 'Stuffing', 'Tannin', 'Weaving'];
        let dyes = ['Blotting paper', 'Dye', 'Ink', 'Mordant', 'Paint', 'Paper', 'Pencil', 'Size'];
        let fertilizer = ['Compost', 'Fertilizer', 'Green manure', 'Liquid feed', 'Potash'];
        let fire = ['Alcohol', 'Biomass', 'Charcoal', 'Friction sticks', 'Fuel', 'Kindling', 'Lighting', 'Oil', 'Tinder', 'Wax', 'Wick'];
        let bathroom = ['Baby care', 'Cleanser', 'Cosmetic', 'Cotton wool', 'Deodorant', 'Disinfectant', 'Essential', 'Hair', 'Resin', 'Soap', 'Soap making', 'Teeth'];
        let garden = ['Fencing', 'Fire retardant', 'Hedge', 'Mulch', 'Pioneer', 'Plant breeding', 'Plant support', 'Rooting hormone', 'Rootstock', 'Shelterbelt', 'Soil conditioner', 'Soil reclamation', 'Soil stabilization'];
        let home = ['Bedding', 'Besom', 'Brush', 'Incense', 'Lining', 'Packing', 'Porcelain', 'Pot-pourri', 'Scourer', 'Strewing', 'String'];
        let kitchen = ['Bottles', 'Containers', 'Cork', 'Filter', 'Fruit ripening', 'Gum', 'Pectin', 'Straw', 'Waxed paper'];
        let other = ['Broom', 'Litmus', 'Microscope', 'Miscellany', 'Musical', 'Pollution', 'Repellent', 'Weather forecasting', 'Weather protection'];
        let pesticides = ['Fungicide', 'Herbicide', 'Insecticide', 'Parasiticide'];
        let woodwork = ['Adhesive', 'Basketry', 'Beads', 'Furniture', 'Lacquer', 'Nails', 'Polish', 'Preservative', 'Rust', 'Sandpaper', 'letnish', 'Waterproofing', 'Wood'];

        for (let i = 0; i < this.otherSelected.length; i++) {
            if (this.otherSelected[i] === "Building") {
                for (let j = 0; j < building.length; j++) {
                    this.finalOtherArray.push(building[j]);
                }
            }
            if (this.otherSelected[i] === "Clothing") {
                for (let j = 0; j < clothing.length; j++) {
                    this.finalOtherArray.push(clothing[j]);
                }
            }
            if (this.otherSelected[i] === "Dyes/Paints/Ink/Paper") {
                for (let j = 0; j < dyes.length; j++) {
                    this.finalOtherArray.push(dyes[j]);
                }
            }
            if (this.otherSelected[i] === "Fertilizers") {
                for (let j = 0; j < fertilizer.length; j++) {
                    this.finalOtherArray.push(fertilizer[j]);
                }
            }
            if (this.otherSelected[i] === "Fire/Lighting") {
                for (let j = 0; j < fire.length; j++) {
                    this.finalOtherArray.push(fire[j]);
                }
            }
            if (this.otherSelected[i] === "Bathroom") {
                for (let j = 0; j < bathroom.length; j++) {
                    this.finalOtherArray.push(bathroom[j]);
                }
            }
            if (this.otherSelected[i] === "Garden") {
                for (let j = 0; j < garden.length; j++) {
                    this.finalOtherArray.push(garden[j]);
                }
            }
            if (this.otherSelected[i] === "Home") {
                for (let j = 0; j < home.length; j++) {
                    this.finalOtherArray.push(home[j]);
                }
            }
            if (this.otherSelected[i] === "Kitchen") {
                for (let j = 0; j < kitchen.length; j++) {
                    this.finalOtherArray.push(kitchen[j]);
                }
            }
            if (this.otherSelected[i] === "Other") {
                for (let j = 0; j < other.length; j++) {
                    this.finalOtherArray.push(other[j]);
                }
            }
            if (this.otherSelected[i] === "Pesticides") {
                for (let j = 0; j < pesticides.length; j++) {
                    this.finalOtherArray.push(pesticides[j]);
                }
            }
            if (this.otherSelected[i] === "Woodwork/Crafts") {
                for (let j = 0; j < woodwork.length; j++) {
                    this.finalOtherArray.push(woodwork[j]);
                }
            }

        }
        //console.log('Line 209 ' + this.finalOtherArray);
        // console.log("whatever");
        //console.log('OUTER OTHER' + this.finalOtherArrayOuter)
        this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArrayOuter, this.edibleSelected);
        return this.finalOtherArray;
    };
    
    
    this.findPlants = function (z, o, m, e) {
        // console.log('ON MY WAY');
        // console.log(z, o, m, e);
        return $http({
            method: 'PUT',
            url: '/plants',
            data: {zone: z, other: o, medical: m, edible: e}
        }).then(function (response) {
            $rootScope.plants = response.data;
            // console.log($rootScope.plants);
            //need to push to this.plants
        })
    };
    this.samplePlants = ()=>{
        return $http.get("/plants");
        // console.log($rootScope.plants);
        //need to push to this.plants

    };
    //FOUR ARRAYS WE NEED TO SEND TO BACKEND
    //finalMedicalArray
    //finalOtherArray
    //edibleSelected
    //currentHardinessZones

});
