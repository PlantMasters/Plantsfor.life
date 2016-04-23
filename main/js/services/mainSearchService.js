"use strict";

angular.module('plantMasters').service('mainSearchService', function ($http) {

    //define search variables
    let currentHardinessZone = 0;
    let finalOtherArray = [];
    let finalMedicalArray = [];
    let edibleSelected = [];
    this.plants = [];
    let _this = this;
    let landing = true;

    //gets a random sample of plants to populate page on load
    this.samplePlants = ()=> {
        $http.get("/plants").then((response) => {
            console.log(response);
            _this.plants = response.data;
        });
    };

    //gets plants that meet search criteria
    let findPlants = function (z, o, m, e) {
        landing = false;
        for (let obj in z) {
            if (z[obj]) {
                z = Number(obj);
                break;
            }
        }
        if (typeof z != `number`) {
            z = 0;
        }
        $http({
            method: 'PUT',
            url: '/plants',
            data: {zone: z, other: o, medical: m, edible: e}
        })
            .then((response) => {
                console.log(response);
                _this.plants = response.data.docs
            });
    };

    //gets plants that match the input field data...
    this.searchName = function (n) {
        landing = false;
        $http({
            method: 'POST',
            url: '/plants',
            data: {name: n}
        })
            .then((response) => {
                _this.plants = response.data.docs;
            });
    };

    this.getMore = ()=> {
        if (landing) {
            this.samplePlants();
        } else {
            $http.get("/more").then((response) => {
                _this.plants = response.data.docs;
            });
        }
    };


    //return plants
    this.getPlants = () => {
        return this.plants;
    };

    //search plants when zone changes
    this.manageZone = function (zone) {
        currentHardinessZone = zone;
        if (finalOtherArray != [] && finalMedicalArray != [] && edibleSelected != []) {
            console.log(`whatever`);
            findPlants(currentHardinessZone, finalOtherArray, finalMedicalArray, edibleSelected)
        }
    };

    //search plants when edible changes
    this.manageEdible = (edibs)=> {
        edibleSelected = [];
        for (let obj in edibs) {
            if (edibs[obj]) {
                edibleSelected.push(obj);
            }
        }
        findPlants(currentHardinessZone, finalOtherArray, finalMedicalArray, edibleSelected);
    };

    //search plants when medical changes
    this.addMedicalSpecific = (meds) => {
        finalMedicalArray = [];

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
                    finalMedicalArray.push(medCats[obj][i]);
                }
            }
        }
        findPlants(currentHardinessZone, finalOtherArray, finalMedicalArray, edibleSelected);
    };

    //search plants when other changes
    this.addOtherSpecific = (others) => {
        finalOtherArray = [];

        let otherCats = {
            "Building": ['Insulation', 'Pipes', 'Pitch', 'Plaster', 'Roofing', 'Thatching'],
            "Clothing": ['Buttons', 'Darning ball', 'Fibre', 'Latex', 'Leather', 'Needles', 'Pins', 'Raffia', 'Starch', 'Stuffing', 'Tannin', 'Weaving'],
            "Dyes/Paints/Ink/Paper": ['Blotting paper', 'Dye', 'Ink', 'Mordant', 'Paint', 'Paper', 'Pencil', 'Size'],
            "Fertilizers": ['Compost', 'Fertilizer', 'Green manure', 'Liquid feed', 'Potash'],
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
                    finalOtherArray.push(otherCats[obj][i]);
                }
            }
        }
        findPlants(currentHardinessZone, finalOtherArray, finalMedicalArray, edibleSelected);
    };
});
