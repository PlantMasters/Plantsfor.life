"use strict";

angular.module('plantMasters').service('mainSearchService', function ($http, $q, $rootScope) {
    // this.currentHardinessZones;
    this.plants = [];
    this.finalOtherArrayOuter = [];
    this.finalMedicalArrayOuter = [];
    this.otherSelected = [];
    this.edibleSelected = [];
    this.medicalSelected = [];
    this.manageSearch = ()=> {

    };
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

    this.addMedicalSpecific = function (meds) {
        this.finalMedicalArray = [];
        // this.finalMedicalArrayOuter = this.finalMedicalArray;

        let medCats = {
            "Alternative Medicine": ['Alternative', 'Aromatherapy', 'Bach', 'Homeopathy'],
            "Bacteria/Viruses/Fungi/Parasites": ['Anthelmintic', 'Antibacterial', 'Antibiotic', 'Antifungal', 'Antiviral', 'Parasiticide', 'Vermifuge', 'Warts'],
            "Bites/Stings": ['Antidote', 'Stings'],
            "Bones": ['Antiarthritic', 'Antiinflammatory', 'Antirheumatic'],
            "Bowels/Bladder": ['Antihaemorrhoidal', 'Aperient', 'Carminative', 'Cathartic', 'Hydrogogue', 'Laxative', 'Purgative'],
            "Cancer": ['Antitumor', 'Cancer', 'Cytostatic', 'Cytotoxic', 'Resolvent'],
            "Chest/Lungs": ['Antiasthmatic', 'Antitussive', 'Decongestant', 'Demulcent', 'Expectorant', 'Pectoral'],
            "Ear/Nose/Throat/Eyes": ['Errhine', 'Mouthwash', 'Mydriatic', 'Odontalgic', 'Ophthalmic', 'Sialagogue', 'Sternutatory'],
            "Fevers": ['Antipyretic', 'Febrifuge'],
            "General Well Being": ['Antiscorbutic', 'Balsamic', 'Nutritive', 'Tonic'],
            "Heart/Blood": ['Anticholesterolemic', 'Anticoagulant', 'Blood purifier', 'Blood tonic', 'Cardiac', 'Cardiotonic', 'Haemolytic', 'Hypoglycaemic', 'Hypotensive', 'Vasoconstrictor', 'Vasodilator'],
            "Infectious Diseases": ['Antiperiodic', 'Antiscrophulatic', 'TB', 'VD'],
            "Liver/Kidneys": ['Antibilious', 'Cholagogue', 'Diuretic', 'Haemostatic', 'Hepatic', 'Kidney', 'Lithontripic'],
            "Nerves/Muscles": ['Antispasmodic', 'Nervine'],
            "Other": ['Antidandruff', 'Antihydrotic', 'Antiphlogistic', 'Antivinous', 'Appetizer', 'Aromatic', 'Astringent', 'Bitter', 'Deodorant', 'Diaphoretic', 'Emollient', 'Enuresis', 'Hallucinogenic', 'Hypnotic', 'Irritant', 'Miscellany', 'Refrigerant', 'Restorative', 'Rubefacient',
                'Sedative', 'Stimulant'
            ],
            "Pain Relief": ['Anaesthetic', 'Analgesic', 'Anodyne', 'Lenitive', 'Narcotic'],
            "Sex/Reproduction": ['Abortifacient', 'Anaphrodisiac', 'Aphrodisiac', 'Birthing aid', 'Contraceptive', 'Emmenagogue', 'Galactofuge', 'Galactogogue', 'Infertility', 'Oxytoxic', 'Uterine tonic', "Women's complaints"],
            "Skin/Hands/Feet": ['Acrid', 'Antidermatosic', 'Antipruritic', 'Foot care', 'Skin', 'Vesicant'],
            "Stomach": ['Antacid', 'Antiemetic', 'Digestive', 'Emetic', 'Stomachic'],
            "Wounds/Bruises": ['Antiecchymotic', 'Antiseptic', 'Detergent', 'Disinfectant', 'Plaster', 'Poultice', 'Salve', 'Styptic', 'Vulnerary'],
            "Whole Body": ['Adaptogen', 'Deobstruent', 'Depurative']
        };

        for (let obj in medCats) {
            if (meds[obj]) {
                for (let i = 0; i < medCats[obj].length; i++) {
                    this.finalMedicalArray.push(medCats[obj][i])
                }
            }
        }
        this.findPlants(this.currentHardinessZones, this.finalOtherArrayOuter, this.finalMedicalArray, this.edibleSelected);
    };

    this.addOtherSpecific = function (others) {
        this.finalOtherArray = [];

        let otherCats = {
            "Building": ['Insulation', 'Pipes', 'Pitch', 'Plaster', 'Roofing', 'Thatching'],
            "Clothing": ['Buttons', 'Darning ball', 'Fibre', 'Latex', 'Leather', 'Needles', 'Pins', 'Raffia', 'Starch', 'Stuffing', 'Tannin', 'Weaving'],
            "Dyes/Paints/Ink/Paper": ['Blotting paper', 'Dye', 'Ink', 'Mordant', 'Paint', 'Paper', 'Pencil', 'Size'],
            "Fertilizer": ['Compost', 'Fertilizer', 'Green manure', 'Liquid feed', 'Potash'],
            "Fire/Lighting": ['Alcohol', 'Biomass', 'Charcoal', 'Friction sticks', 'Fuel', 'Kindling', 'Lighting', 'Oil', 'Tinder', 'Wax', 'Wick'],
            "Bathroom": ['Baby care', 'Cleanser', 'Cosmetic', 'Cotton wool', 'Deodorant', 'Disinfectant', 'Essential', 'Hair', 'Resin', 'Soap', 'Soap making', 'Teeth'],
            "Garden": ['Fencing', 'Fire retardant', 'Hedge', 'Mulch', 'Pioneer', 'Plant breeding', 'Plant support', 'Rooting hormone', 'Rootstock', 'Shelterbelt', 'Soil conditioner', 'Soil reclamation', 'Soil stabilization'],
            "Home": ['Bedding', 'Besom', 'Brush', 'Incense', 'Lining', 'Packing', 'Porcelain', 'Pot-pourri', 'Scourer', 'Strewing', 'String'],
            "Kitchen": ['Bottles', 'Containers', 'Cork', 'Filter', 'Fruit ripening', 'Gum', 'Pectin', 'Straw', 'Waxed paper'],
            "Other": ['Broom', 'Litmus', 'Microscope', 'Miscellany', 'Musical', 'Pollution', 'Repellent', 'Weather forecasting', 'Weather protection'],
            "Pesticides": ['Fungicide', 'Herbicide', 'Insecticide', 'Parasiticide'],
            "Woodwork/Crafts": ['Adhesive', 'Basketry', 'Beads', 'Furniture', 'Lacquer', 'Nails', 'Polish', 'Preservative', 'Rust', 'Sandpaper', 'nish', 'Waterproofing', 'Wood']
        };

        for (let obj in otherCats) {
            if (others[obj]) {
                for (let i = 0; i < otherCats[obj].length; i++) {
                    this.finalOtherArray.push(otherCats[obj][i])
                }
            }
        }
        this.findPlants(this.currentHardinessZones, this.finalOtherArray, this.finalMedicalArray, this.edibleSelected);
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
    this.samplePlants = ()=> {
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
