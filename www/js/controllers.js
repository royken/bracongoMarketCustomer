/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ionic','firebase'])

.controller('AppCtrl', function($scope, $ionicModal,$state ,$ionicPopover, $timeout,$ionicPlatform,UserService,ApiEndpoint,Application) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    var vm = this;

    $ionicPlatform.ready(function() {

        // Initialize the database.
        UserService.initDB();

        // Get all birthday records from the database.
       /* UserService.getAllUsers()
                        .then(function (users) {
                            vm.users = users;
                        });
                        */
    });

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.login = function(){
        console.log("credentials",$scope.loginData);
        Application.registerUser($scope.loginData.login,$scope.loginData.passwd,$scope.loginData.mail,$scope.loginData.nom);
        $state.go('app.accueil');

    };
})

.controller('AccueilCtrl', function($scope ,$state, $timeout, $stateParams, ionicMaterialInk) {
     $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    
        $scope.eventsPage = function(){ 
            $state.go('app.listEvent');        
        }
        $scope.campagnesPage = function(){ 
            $state.go('app.listCampagnes');        
        }
        $scope.jeuxPage = function(){ 
            $state.go('app.listJeux');        
        }
        $scope.loisirsPage = function(){ 
            $state.go('app.listLoisirs');        
        }
        $scope.emploisPage = function(){ 
            $state.go('app.listEmplois');        
        }
        $scope.aboutPage = function(){ 
            $state.go('app.about');        
        }
        $scope.fete = function(){ 
            $state.go('app.serviceFete');        
        }
        $scope.barProche = function(){ 
            $state.go('app.barProcheMap');        
        }
        $scope.animation = function(){ 
            $state.go('app.planning');        
        }
        $scope.chateaux= function(){ 
            $state.go('app.cleCategorie');        
        }
        $scope.game = function(){
            $state.go('app.profile');
        }
        $scope.contact = function(){
            $state.go('app.contact');
        }
        $scope.infos = function(){
            $state.go('app.infos');
        }

    ionicMaterialInk.displayEffect();
})

.controller('LoginCtrl', function($scope, $timeout,$state,  $stateParams, ionicMaterialInk,UserService,Application,firebase) {
    $scope.$parent.clearFabs();
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.login = function(){
        console.log("credentials",$scope.loginData);
        Application.registerUser($scope.loginData.login,$scope.loginData.passwd,$scope.loginData.mail,$scope.loginData.nom);
        var refEvent = firebase.database().ref().child("users");
        var objet = {
            nom : $scope.loginData.nom,
            mail : $scope.loginData.mail,
            mdp : $scope.loginData.passwd,
            login:$scope.loginData.login
        }
        refEvent.push(objet);
        $state.go('app.accueil');

    };
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('EventsCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.events = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000,
                    animation: 'fade-in',
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.clearFabs();

    function show() {
        $ionicLoading.show({
           template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000,
            animation: 'fade-in',
        });
  };
  function hide(){
        $ionicLoading.hide();
  };
    
    show();        
    $scope.events = serviceFactory.getAllEvent();
    $scope.events.$loaded().then(function(){
        // access events here;
        hide();
    });
       
    $scope.detailEvent = function(id){ 
        console.log("J'envoie", id);
        $state.go('app.itemEvent', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('EventCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.event = null;
    var eventId = $stateParams.id;
    console.log("L'id de l'event", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(eventId) ;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.event = serviceFactory.getOneEvent(eventId);
  //console.log("l'event",$scope.event.titre);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('CampagnesCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.campagnes = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
   $scope.$parent.clearFabs();
    
    $scope.campagnes = serviceFactory.getAllCampagnes();
        console.log( $scope.campagnes) ; 

    $scope.detailCampagne = function(id){ 
        console.log("J'envoie", id);
        $state.go('app.itemCampagne', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('CampagneCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.campagne = null;
    var campagneId = $stateParams.id;
    console.log("L'id de l'event", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(campagneId) ;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.campagne = serviceFactory.getOneCampagne(campagneId);
  console.log("campagnes",$scope.campagne.titre);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('JeuxCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.jeux = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    $scope.jeux = serviceFactory.getAllJeux();
        console.log( $scope.jeux) ; 

    $scope.detailJeux = function(id){ 
        console.log("J'envoie", id);
        $state.go('app.itemJeux', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('JeuCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.jeu = null;
    var jeuId = $stateParams.id;
    console.log("L'id de l'event", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(jeuId) ;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.jeu = serviceFactory.getOneJeux(jeuId);
  console.log("jeu",$scope.jeu.titre);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('LoisirsCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.loisirs = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    $scope.loisirs = serviceFactory.getAllLoisirs();

    $scope.detailLoisir = function(id){ 
        $state.go('app.itemLoisir', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('LoisirCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.loisir = null;
    var loisirId = $stateParams.id;
    $scope.$parent.clearFabs();
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.loisir = serviceFactory.getOneLoisir(loisirId);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('EmploisCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.emplois = [];
    $ionicLoading.show({     
                    template: '<div class="icon ion-loading-a"></div> Loading... ',
                    animation: 'fade-in',
                    showBackdrop: true
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();

   /* Trendingpackages.$loaded().then(function(){
    $ionicLoading.hide();
  })
   */ 
    $scope.emplois = serviceFactory.getAllEmplois();


    $scope.detailEmploi = function(id){ 
        $state.go('app.itemEmploi', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('EmploiCtrl', function($scope, $stateParams, $timeout,$ionicLoading,$ionicModal, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.emploi = null;
    var emploiId = $stateParams.id;
    $scope.emailSend = "rdsid@bracongo.cd";

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.emploi = serviceFactory.getOneEmploi(emploiId);
  $ionicLoading.hide();
  $ionicModal.fromTemplateUrl('templates/postuler.html',{
    scope: $scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  $scope.openModal = function(){
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }


  $scope.envoyerMail= function(nom,prenom,mail,tel,linkedin) {
      
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            },  
            "Réponse Offre d'emploi ref: " + $scope.emploi.reference, // Subject
            " Nom : "+nom+"\n Prenom : "+prenom+"\n Email : "+mail+"\n Téléphone : "+tel+"\n LinkedIn : "+linkedin,                      // Body
            ["roykenvalmy@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
        $scope.closeModal();
    }

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ChateauCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.categories = [];
    $ionicLoading.show({     
                    template: '<div class="icon ion-loading-a"></div> Loading... ',
                    duration: 3000,
                    animation: 'fade-in',
                  });
    
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();


    function show() {
        $ionicLoading.show({
           template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000,
            animation: 'fade-in',
        });
    };
    function hide(){
        $ionicLoading.hide();
    };
    
    //show();          

    $scope.categories = serviceFactory.getAllCategories();
    serviceFactory.getAllCategories().$loaded().then(function(){
        // access events here;
       $ionicLoading.hide();
    });
    $scope.detailCat = function(id){ 
        $state.go('app.categorieList', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('CategorieListCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.$parent.clearFabs();
    var categorieId = $stateParams.id;
    $scope.cat = null;
    $ionicLoading.show({     
                    template: '<div class="icon ion-loading-a"></div> Loading... ',
                    animation: 'fade-in',
                    showBackdrop: true
                  });
    console.log("L'id de la categorie", $stateParams.id);
    $scope.cat = serviceFactory.getOneCategorie($stateParams.id);
    console.log("categorie", $scope.cat);
    $scope.produits = serviceFactory.getCategorieProductList($scope.cat.code);
    /*$scope.produits = [
        {nom:"Saint Julien Chateau Beychevelle",prix:[{volume:"75CL",valeur:"234,000"}]},
        {nom:"Château ferrande rouge",prix:[{volume:"1,5L",valeur:"61,000"},{volume:"75CL",valeur:"36,000"},{volume:"37,5CL",valeur:"15,000"}]}
    ];
    */

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
  
    $scope.detailVin = function(id){ 
        state.go('app.vinDetail', {id: id});        
    }  

  
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('VinCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.vin = null;
    var vinId = $stateParams.id;
    $scope.$parent.clearFabs();
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.vin = serviceFactory.getOneVin(vinId);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('PlanningCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.emplois = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    
    $scope.planning = [
        {jour:"Lundi 06/02/2017",anims:[{responsable:"Royken",lieu:"Kintambo",heure:"17h00",marque:"Nkoyi"},{responsable:"Royken",lieu:"Ngombe",heure:"18h00",marque:"33 Export"},{responsable:"Royken1",lieu:"Ngaliema",heure:"14h00",marque:"World Cola"}]},
        {jour:"Mardi 07/02/2017",anims:[{responsable:"Roy",lieu:"Ngaba",heure:"17h00",marque:"Doppel"},{responsable:"Royken roy",lieu:"Ngiri Ngiri",heure:"18h00",marque:"Top Cola"},{responsable:"Royken4",lieu:"Bumbu",heure:"14h00",marque:"Castel"}]}
    ];
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('MapCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory,GoogleMaps) {
    
    
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
     $ionicLoading.hide();

     GoogleMaps.init();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('ContactCtrl', function($scope,$state ,$stateParams,$http ,$timeout,$ionicPopup,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,$cordovaGeolocation,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.$parent.clearFabs();
    $scope.emailSend = "rdsid@bracongo.cd";
    $scope.rating = {};
    $scope.rating.rate = 3;
    $scope.rating.max = 5;
    $scope.pdvs = [];

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  /*  $http.get("http://41.223.104.197:8080/pdv/api/pdv").then(function(response){
          $scope.pdvs = response.data;
          console.log("fresh", JSON.stringify(response));
        //  return pdvProche;
      });
    */
 // $scope.pdvs = serviceFactory.getPdvs();
 // console.log("data",JSON.stringify($scope.pdvs));
  //console.log("data0",$scope.pdvs[0]);
  $ionicLoading.hide();

  $scope.toto = function(){
    console.log("helooooooooo");
  };

  $scope.showMap = function(){ 
        $state.go('app.barProcheMap');        
    }

     $scope.$on('mapInitialized', function (event, map) {
        $scope.map = map;
    });

    


var options = {timeout: 10000, enableHighAccuracy: true};
 
 $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 
  var infoWindow = new google.maps.InfoWindow({
      content: "Je suis ici!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
 
});
 /////////
  }, function(error){
    console.log("Could not get location");
    /*A retier après*/
        showPopup();
  });

  function showPopup() {
        var alertPopup = $ionicPopup.alert({
            title: 'Etat GPS!',
            template: 'Veuillez activer votre GPS :-)!!! '
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
  
  $scope.envoyerSuggestion= function(contenu) {
      
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            },  
            "Message pour boîte à suggestion", // Subject
            contenu,                      // Body
            ["roykenvalmy@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
       // $scope.closeModal();
    }

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('InfosCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk) {
    
    
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('ServiceFeteCtrl', function($scope,$timeout ,$state, $ionicLoading,$ionicModal, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
   $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
     $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.tel="+2437726627";
    $scope.mail = "servicefete@bracongo.cd";
    $scope.pageSimuler = function(){
        $state.go('app.simulateur');
    };

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
        
    $ionicModal.fromTemplateUrl('templates/proforma.html',{
        scope: $scope,
     animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  $scope.openModal = function(){
    $scope.reinitialier();
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }
  $scope.biere;
    $scope.bg;
    $scope.casier;
    $scope.pression;
    $scope.nbrFutTembo;
    $scope.nbrFutSkol;
    $scope.nbrCasierBeau ;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierDoppel;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierNkoyi ;
    $scope.nbrCasierNkoyiBlaclk ;
    $scope.nbrCasierTembo ;
    $scope.nbrCasierSkol ;
    $scope.nbrCasierBg ;
    $scope.loginData = {};
    $scope.prixUnique = -1;
    $scope.nbrBarman;
    $scope.nbrHotesse;
    $scope.boissonPrise;

    $scope.reinitialier = function(){
        $scope.loginData = {};
        $scope.prixUnique = -1;
        $scope.nbrBarman = null;
        $scope.nbrHotesse = null;
        $scope.boissonPrise = null;
    }
        
    $scope.calculer = function(){
        console.log("Data", $scope.loginData);
        console.log("biere", $scope.loginData.biere);
        console.log("casier", $scope.loginData.casier);
        console.log("pression", $scope.loginData.pression);
        $scope.prixUnique = $scope.prixIndividus($scope.loginData.nbrPlace);
        $scope.nbrBarman = $scope.barman($scope.loginData.nbrPlace);
        $scope.nbrHotesse = $scope.hotesse($scope.loginData.nbrPlace);
        console.log("Prix par personne",$scope.prixIndividus($scope.loginData.nbrPlace));
        var temp;
        if($scope.loginData.biere && $scope.loginData.casier && $scope.loginData.pression && $scope.loginData.bg){
             temp = "Vous prenez de la bière en casier et en préssion ainsi que des boissons gazeuses. Nous allons vous proposer un mélange de différents parfums ";
        }
        if($scope.loginData.biere && $scope.loginData.casier && $scope.loginData.pression &&  !($scope.loginData.bg)){
             temp = "Vous prenez de la bière en casier et en préssion. Nous allons vous proposer un mélange de différents parfums ";
        }
        if($scope.loginData.biere && $scope.loginData.casier && !($scope.loginData.pression) &&  !($scope.loginData.bg)){
             temp = "Vous prenez de la bière en casier. Nous allons vous proposer un mélange de différents parfums ";
        }
        if($scope.loginData.biere && $scope.loginData.casier && !($scope.loginData.pression) &&  $scope.loginData.bg){
             temp = "Vous prenez de la bière en casier et des boissons gazeuses. Nous allons vous proposer un mélange de différents parfums ";
        }
        if($scope.loginData.biere && !($scope.loginData.casier) && $scope.loginData.pression &&  $scope.loginData.bg){
             temp = "Vous prenez de la bière en pression et des boissons gazeuses. Nous allons vous proposer un mélange de différents parfums ";
        }
        if($scope.loginData.biere && !($scope.loginData.casier) && $scope.loginData.pression &&  !($scope.loginData.bg)){
             temp = "Vous prenez de la bière en pression uniquement.";
        }
        if(!($scope.loginData.biere) && $scope.loginData.bg){
             temp = "Vous prenez des boissons gazeuses uniquement.";
        }

        if($scope.loginData.biere && !($scope.loginData.bg)){
             temp = "Vous prenez de la bière.";
        }

        if(!($scope.loginData.biere) &&  !($scope.loginData.bg)){
             temp = "Vous n'arrivez pas à vous décider côté boisson? Faites nous confiance!!!";
        }

        $scope.boissonPrise = temp;
    }

    $scope.calculerPrixInd = function(nombrePersonne){
       // var result;
        if(0 <= nombrePersonne && nombrePersonne <= 50)
            return 5;
        if(50 <= nombrePersonne && nombrePersonne <= 100)
            return 4;
        if(100 <= nombrePersonne && nombrePersonne <= 500)
            return 3;
    }

    /* Calcul le nombre de barmans en fonction du nombre d'hotesse*/
    $scope.barman = function(nombrePersonne){
        if(nombrePersonne < 50)
            return 1;
        if(50 < nombrePersonne && nombrePersonne < 100)
            return 2;
        return 4;
    }

    /* Calcul le nombre d'hotesse en fonction du nombre d'hotesse*/
    $scope.hotesse = function(nombrePersonne){
        if(nombrePersonne < 50)
            return 2;
        if(50 < nombrePersonne && nombrePersonne < 100)
            return 5;
        return 20;
    }

    /* Calcul du prix individuel en fonction du nombre de personnes*/
    $scope.prixIndividus = function(nombrePersonne){
        var result = ((7/180000)*Math.pow(nombrePersonne,2) )- ((31/1200)*nombrePersonne) + (222/36);
        return Math.round(result);
    }

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('SimulateurCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.nbrPlace=null;
    $scope.mail = "servicefete@bracongo.cd";
    $scope.biere;
    $scope.bg;
    $scope.casier;
    $scope.pression;
    $scope.nbrFutTembo;
    $scope.nbrFutSkol;
    $scope.nbrCasierBeau ;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierDoppel;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierNkoyi ;
    $scope.nbrCasierNkoyiBlaclk ;
    $scope.nbrCasierTembo ;
    $scope.nbrCasierSkol ;
    $scope.nbrCasierBg ;
    $scope.loginData = {};
        
    $scope.calculer = function(){
        console.log("Data", $scope.loginData);
        console.log("biere", $scope.loginData.biere);
        console.log("casier", $scope.loginData.casier);
        console.log("pression", $scope.loginData.pression);
        console.log("nbrFutTembo", $scope.loginData.nbrFutTembo);
        console.log("nbrCasierBeau", $scope.loginData.nbrCasierBeau);
        console.log("nbrCasierNkoyi", $scope.loginData.nbrCasierNkoyi);
        console.log("biere", $scope.loginData.biere);
    }

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('AboutCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,firebase,Application) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.nom = null;

    $scope.getNom = function(){
        Application.getName().then(function(value){
            $scope.nom = value;
            console.log("Le nom du user",$scope.nom);
        });
    
    }

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
   
  
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.factory('GoogleMaps', function($cordovaGeolocation, serviceFactory,$ionicPopup,$ionicLoading){

    function show() {
        $ionicLoading.show({
           template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000,
            animation: 'fade-in',
        });
  };
  function hide(){
        $ionicLoading.hide();
  };
 
  var apiKey = false;
  var map = null;
  var markerCache = [];
 
  function initMap(){
    show();
 
    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
 
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){

        // add the user's position marker
        var markerPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              
              var marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: markerPos,
                  icon: 'img/pin/green-dot.png'
              });
        var infoWindowContent = "<h3>" + "Je suis ici" + "</h3>" ;          
 
              addInfoWindow(marker, infoWindowContent, latLng);
 
        //Load the markers
        loadMarkers();
        //Reload markers every time the map moves
       /* google.maps.event.addListener(map, 'dragend', function(){
          console.log("moved!");
          loadMarkers();
        });
        */
 
        //Reload markers every time the zoom changes
       /* google.maps.event.addListener(map, 'zoom_changed', function(){
          console.log("zoomed!");
          loadMarkers();
        });
        */
       // enableMap();
 
      });
 
    }, function(error){
      // Triggered on a button click, or some other target
      hide();
        showPopup();
    });
  }

   function showPopup() {
        var alertPopup = $ionicPopup.alert({
            title: 'Etat GPS!',
            template: 'Veuillez activer votre GPS :-)!!! '
        });
       /* alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
        */
    };

   function enableMap(){
    $ionicLoading.hide();
  }
 
  function disableMap(){
    $ionicLoading.show({
      template: 'You must be connected to the Internet to view this map.'
    });
  }
 
  function loadMarkers(){
    var rating = {};
    rating.rate = 3;
    rating.max = 5;
    var center = map.getCenter();
      var bounds = map.getBounds();
      var zoom = map.getZoom();
 
      //Convert objects returned by Google to be more readable
      var centerNorm = {
          lat: center.lat(),
          lng: center.lng()
      };
 
      var boundsNorm = {
          northeast: {
              lat: bounds.getNorthEast().lat(),
              lng: bounds.getNorthEast().lng()
          },
          southwest: {
              lat: bounds.getSouthWest().lat(),
              lng: bounds.getSouthWest().lng()
          }
      };
 
   /*   var boundingRadius = getBoundingRadius(centerNorm, boundsNorm);
 
      var params = {
        "centre": centerNorm,
        "bounds": boundsNorm,
        "zoom": zoom,
        "boundingRadius": boundingRadius
      };
    */
      //Get all of the markers from our Markers factory
      //var toto = [];
      //toto = serviceFactory.getSavedPdv();
      //console.log("I've got ",toto);

      serviceFactory.getPdvs().then(function(markers){
 
        
 
        var records = markers;
 
        for (var i = 0; i < records.length; i++) {
 
          var record = records[i];  
          //console.log("Markers: ", records[i]); 
         /* var markerPos = new google.maps.LatLng(record.latitude, record.longitude);
 
          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });
 
          var infoWindowContent = "<h4>" + record.nom + "</h4>";          
 
          addInfoWindow(marker, infoWindowContent, record);
          */
          if (!markerExists(record.latitude, record.longitude)) {
 
              var markerPos = new google.maps.LatLng(record.latitude, record.longitude);
              // add the marker
              var marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: markerPos
              });
 
// Add the marker to the markerCache so we know not to add it again later
              var markerData = {
                latitude: record.latitude,
                longitude: record.longitude,
                marker: marker
              };
 
              markerCache.push(markerData);
 
              var infoWindowContent = "<h3>" + record.nom + "</h3>"+"</br>" + "<h4>" + record.adresse + "</h4>"+"</br>"+"<rating ng-model=3 max=5 readonly=true>"+"</rating>";          
 
              addInfoWindow(marker, infoWindowContent, record);
          }
        }

 
      });
      hide(); 
 
  }

  function markerExists(lat, lng){
      var exists = false;
      var cache = markerCache;
      for(var i = 0; i < cache.length; i++){
        if(cache[i].latitude === lat && cache[i].longitude === lng){
          exists = true;
        }
      }
 
      return exists;
  }
 
  function addInfoWindow(marker, message, record) {
 
      var infoWindow = new google.maps.InfoWindow({
          content: message
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
  }
 
  return {
    init: function(){
      initMap();
    }
  }
 
})
.factory('serviceFactory', function($ionicLoading,$firebaseArray, $firebaseObject,$http,ApiEndpoint){
 
    var   auth = firebase.auth();
    var database = firebase.database().ref();
    var storage = firebase.storage();
    var refEvent = database.child('events');
    var refJeux = database.child('jeux');
    var refCampagnes = database.child('campagnes');
    var refLoisirs = database.child('loisirs');
    var refEmplois = database.child('emplois');
    var refCategories = database.child('categories');
    var refVins = database.child('vins');
    var localEvents = [];
    var localJeux = [];
    var localCampagnes = [];
    var localLoisirs = [];
    var emplois = [];
    var pdvProche = [];
    var pdvProches = [];
    var localCategories = [];
    var localVins = [];
    var i ;

    
    
  return {

    getPdvs: function(){
 
      return $http.get("http://41.223.104.197:8080/pdv/api/pdv").then(function(response){
          pdvProche = response;
          pdvProches = response.data;
          //console.log("fresh", JSON.stringify(response));
          return pdvProches;
      });
    },

    getSavedPdv: function(){
        return pdvProches;
    },

    getAllEvent: function(){

       localEvents = $firebaseArray(refEvent);
      return $firebaseArray(refEvent);
    },
    getOneEvent: function(id){
            for(i=0; i < localEvents.length; i++){
                if(localEvents[i].$id == id){
                    return localEvents[i];
                }
            }
    },
    getAllCampagnes: function(){ 
        localCampagnes = $firebaseArray(refCampagnes);
      return $firebaseArray(refCampagnes);
    },
    getOneCampagne: function(id){
            for(i=0; i < localCampagnes.length; i++){
                if(localCampagnes[i].$id == id){
                    return localCampagnes[i];
                }
            }
    },
    getAllJeux: function(){ 
        localJeux = $firebaseArray(refJeux);
      return $firebaseArray(refJeux);
    },
    getOneJeux: function(id){
            for(i=0; i < localJeux.length; i++){
                if(localJeux[i].$id == id){
                    return localJeux[i];
                }
            }
    },
    getAllLoisirs: function(){ 
        localLoisirs = $firebaseArray(refLoisirs);
      return $firebaseArray(refLoisirs);
    },
    getOneLoisir: function(id){
            for(i=0; i < localLoisirs.length; i++){
                if(localLoisirs[i].$id == id){
                    return localLoisirs[i];
                }
            }
    },
    getAllEmplois: function(){
        emplois = $firebaseArray(refEmplois);
        return $firebaseArray(refEmplois);
    },
    getOneEmploi: function(id){
        
            for(i=0; i < emplois.length; i++){
                if(emplois[i].$id == id){
                    return emplois[i];
                }
            }
    },
    getAllCategories: function(){
        localCategories = $firebaseArray(refCategories);
        localVins = $firebaseArray(refVins);
        console.log("vins",localVins);
        return $firebaseArray(refCategories);
    },
    getOneCategorie: function(id){       
            for(i=0; i < localCategories.length; i++){
                if(localCategories[i].$id == id){
                    return localCategories[i];
                }
            }
    },

    getCategorieProductList: function(code){
        var result = [];    
            //console.log("CODE",code);
            //console.log("TAILLE",localVins.length);
            for(i = 0; i < localVins.length; i++){
                if(localVins[i].categorie === code){
                    result.push(localVins[i]);
                }
            }
            return result;

    },
    getAllVins: function(){
        localVins = $firebaseArray(refVins);
        return $firebaseArray(refVins);
    },
    getOneVin: function(id){       
            for(i=0; i < localVins.length; i++){
                if(localVins[i].$id == id){
                    return localVins[i];
                }
            }
    },
  }  
})

.factory('UserService',['$q','Loki', function($q, Loki){
//.factory('UserService', ['$q', 'Loki', UserService]);

//function UserService($q, Loki) {  
    var _db;
    var _users;

    function initDB() {          
        var adapter = new LokiCordovaFSAdapter({"prefix": "loki"});  
        _db = new Loki('userDB',
                {
                    autosave: true,
                    autosaveInterval: 1000, // 1 second
                    adapter: adapter
                });
    };

     function getAllUsers() {        
            return $q(function (resolve, reject) {
    
                var options = {
                    users: {
                        proto: Object,
                        inflate: function (src, dst) {
                            var prop;
                            for (prop in src) {
                                if (prop === 'Date') {
                                    dst.Date = new Date(src.Date);
                                } else {
                                    dst[prop] = src[prop];
                                }
                            }
                        }
                    }
                };
    
                _db.loadDatabase(options, function () {
                    _users = _db.getCollection('users');
    
                    if (!_users) {
                        _users = _db.addCollection('users');
                    }
    
                    resolve(_users.data);
                });
            });
};


     function addUser(user) {
            _users.insert(user);
        };

        function updateUser(user) {            
            _users.update(user);
        };

        function deleteUser(user) {
            _users.remove(user);
        };

    return {
        initDB: initDB,
        getAllUsers: getAllUsers,
        addUser: addUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
//}
}])

.factory('Application', function ($cordovaNativeStorage,$state) {
    return {
      setInitialRun: function (initial) {
        $cordovaNativeStorage.setItem("initialRun", initial).then(function () {
            console.log("Initialrun set");
        }, function(error){
             console.log("ERRRRUUUURRRRRRR");
             console.log(error);  
        });
      },
      isInitialRun : function () {
      /*  NativeStorage.getBoolean("initialRun",
            function(value){
                 console.log("InitialRun",value);
                 return value == "true";
             },
             function(e){
                fail("Erreur lors de l'enregistrement");
             });
        */
        console.log("TOOOOOTTTTOOOOOO");
        return $cordovaNativeStorage.getItem("initialRun").then(function (value) {
            console.log("InitialRun",value);
            return value == "true";
        }, function(error){
            console.log("EROR GET INITIALRUN");
            $cordovaNativeStorage.setItem("initialRun", false).then(function () {
            console.log("Initialrun set 2");
        }, function(error){
             console.log("roor setting initial run");
             console.log(error);  
        });
            $state.go("app.login");            
             console.log(error);  
        });
      },
      registerUser : function(login,mdp,mail,name){
        $cordovaNativeStorage.setItem("login", login).then(function () {
            console.log("YOUUUPIIII login");
        }, function(error){
             console.log("ERRRRUUUURRRRRRR login");
             console.log(error);  
        });
        $cordovaNativeStorage.setItem("mdp", mdp).then(function () {
            console.log("YOUUUPIIII mdp");
        }, function(error){
             console.log("ERRRRUUUURRRRRRR mdp");
             console.log(error);  
        });
        $cordovaNativeStorage.setItem("mail", mail).then(function () {
            console.log("YOUUUPIIII mail");
        }, function(error){
             console.log("ERRRRUUUURRRRRRR mail");
             console.log(error);  
        });
        $cordovaNativeStorage.setItem("name", name).then(function () {
            console.log("YOUUUPIIII");
        }, function(error){
             console.log("ERRRRUUUURRRRRRR");
             console.log(error);  
        });
      },

      getName : function () {
        return $cordovaNativeStorage.getItem("name").then(function (value) {
            console.log("name",value);
            return value;
        }, function(error){
             console.log("ERRRRUUUUR Recup Nom");
             console.log(error);  
        });
      },

      getMail : function () {
        $cordovaNativeStorage.getItem("mail").then(function (value) {
            console.log("name",value);
            return value;
        }, function(error){
             console.log("ERRRRUUUUR Recup Mail");
             console.log(error);  
        });
      },
    };
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    $scope.puzzels = [];
    if($stateParams.level==1){
        $scope.puzzels.push(
            {
                titre : "Les Simpsons",
                nom : "simpson",
                lien : "app.game({pack: 'simpson', level: '3'})",
                src : "img/simpson.jpg",
                time : 7,
                pts : 50
            }
        );
        $scope.puzzels.push(
            {
                titre : "Bob eponge",
                nom : "bobleponge",
                lien : "app.game({pack: 'bobleponge', level: '3'})",
                src : "img/bobleponge.jpg",
                time : 5,
                pts : 40
            }
        );
        $scope.puzzels.push(
            {
                titre : "Dora L'exploratrice",
                nom : "dora_exploratrice",
                lien : "app.game({pack: 'dora_exploratrice', level: '3'})",
                src : "img/dora_exploratrice.jpg",
                time : 7,
                pts : 56
            }
        );
        $scope.puzzels.push(
            {
                titre : "Pokemon",
                nom : "pokemon",
                lien : "app.game({pack: 'pokemon', level: '3'})",
                src : "img/pokemon.jpg",
                time : 10,
                pts : 30
            }
        );
    }else if($stateParams.level==2){
        $scope.puzzels.push(
            {
                titre : "Les Mini Mois",
                nom : "minimos",
                lien : "app.game({pack: 'minimos', level: '4'})",
                src : "img/minimos.jpg",
                time : 7,
                pts : 50
            }
        );
        $scope.puzzels.push(
            {
                titre : "Les Avengers",
                nom : "avenger",
                lien : "app.game({pack: 'avenger', level: '4'})",
                src : "img/avenger.jpg",
                time : 5,
                pts : 40
            }
        );
        $scope.puzzels.push(
            {
                titre : "Spider Man",
                nom : "spiderman",
                lien : "app.game({pack: 'spiderman', level: '4'})",
                src : "img/spiderman.jpg",
                time : 7,
                pts : 56
            }
        );
        $scope.puzzels.push(
            {
                titre : "Hunter X Hunter",
                nom : "hunterxhunter",
                lien : "app.game({pack: 'hunterxhunter', level: '4'})",
                src : "img/hunterxhunter.jpg",
                time : 10,
                pts : 30
            }
        );
    }else if($stateParams.level==3){
        $scope.puzzels.push(
            {
                titre : "One Peace",
                nom : "one_piece",
                lien : "app.game({pack: 'one_piece', level: '5'})",
                src : "img/one_piece.jpg",
                time : 7,
                pts : 50
            }
        );
        $scope.puzzels.push(
            {
                titre : "Naruto",
                nom : "naruto",
                lien : "app.game({pack: 'naruto', level: '5'})",
                src : "img/naruto.jpg",
                time : 5,
                pts : 40
            }
        );
        $scope.puzzels.push(
            {
                titre : "Dragon Ball Z",
                nom : "dragonballz",
                lien : "app.game({pack: 'dragonballz', level: '5'})",
                src : "img/dragonballz.jpg",
                time : 7,
                pts : 56
            }
        );
        $scope.puzzels.push(
            {
                titre : "Les indestructibles",
                nom : "indestructibles",
                lien : "app.game({pack: 'indestructibles', level: '5'})",
                src : "img/indestructibles.jpg",
                time : 10,
                pts : 30
            }
        );
    }

})

.controller('GameCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    $scope.niveau = 1;
    $scope.packImg = $stateParams.pack;
    $scope.nombre = $stateParams.level;
    $scope.lists = [];
    $scope.generique = (new Audio("audio/"+$scope.packImg+".mp3",0.2)).play();
    console.log("La musique",$scope.generique);

    if($scope.nombre==3){
        var list=[];
        list.push( [3,1,5,2,8,7,6,0,4]);list.push( [3,1,5,2,8,7,0,6,4]);list.push( [3,1,5,0,8,7,2,6,4]);list.push( [0,1,5,3,8,7,2,6,4]);list.push( [1,0,5,3,8,7,2,6,4]);list.push( [1,8,5,3,0,7,2,6,4]);list.push( [1,8,5,0,3,7,2,6,4]);list.push( [0,8,5,1,3,7,2,6,4]);list.push( [8,0,5,1,3,7,2,6,4]);list.push( [8,3,5,1,0,7,2,6,4]);list.push( [8,3,5,1,6,7,2,0,4]);list.push( [8,3,5,1,6,7,0,2,4]);list.push( [8,3,5,0,6,7,1,2,4]);list.push( [8,3,5,6,0,7,1,2,4]);list.push( [8,3,5,6,2,7,1,0,4]);list.push( [8,3,5,6,2,7,1,4,0]);list.push( [8,3,5,6,2,0,1,4,7]);list.push( [8,3,5,6,0,2,1,4,7]);list.push( [8,0,5,6,3,2,1,4,7]);list.push( [8,5,0,6,3,2,1,4,7]);list.push( [8,5,2,6,3,0,1,4,7]);list.push( [8,5,2,6,0,3,1,4,7]);list.push( [8,5,2,6,4,3,1,0,7]);list.push( [8,5,2,6,4,3,0,1,7]);list.push( [8,5,2,0,4,3,6,1,7]);list.push( [0,5,2,8,4,3,6,1,7]);list.push( [5,0,2,8,4,3,6,1,7]);list.push( [5,4,2,8,0,3,6,1,7]);list.push( [5,4,2,0,8,3,6,1,7]);list.push( [5,4,2,6,8,3,0,1,7]);list.push( [5,4,2,6,8,3,1,0,7]);list.push( [5,4,2,6,0,3,1,8,7]);list.push( [5,4,2,6,3,0,1,8,7]);list.push( [5,4,2,6,3,7,1,8,0]);list.push( [5,4,2,6,3,7,1,0,8]);list.push( [5,4,2,6,0,7,1,3,8]);list.push( [5,4,2,6,7,0,1,3,8]);list.push( [5,4,0,6,7,2,1,3,8]);list.push( [5,0,4,6,7,2,1,3,8]);list.push( [5,7,4,6,0,2,1,3,8]);list.push( [5,7,4,0,6,2,1,3,8]);list.push( [0,7,4,5,6,2,1,3,8]);list.push( [7,0,4,5,6,2,1,3,8]);list.push( [7,6,4,5,0,2,1,3,8]);list.push( [7,6,4,5,2,0,1,3,8]);list.push( [7,6,4,5,2,8,1,3,0]);list.push( [7,6,4,5,2,8,1,0,3]);list.push( [7,6,4,5,2,8,0,1,3]);list.push( [7,6,4,0,2,8,5,1,3]);list.push( [0,6,4,7,2,8,5,1,3]);list.push( [6,0,4,7,2,8,5,1,3]);list.push( [6,4,0,7,2,8,5,1,3]);
        var taille = list.length;
        var randomnumber = Math.floor(Math.random() * (taille));
        $scope.lists = list[randomnumber];
    }else if($scope.nombre==4){
        var list=[];
        list.push( [1,5,2,3,4,6,10,7,8,13,9,11,12,14,15,0]);list.push( [1,5,2,3,4,6,10,7,8,13,9,0,12,14,15,11]);list.push( [1,5,2,3,4,6,10,7,8,13,0,9,12,14,15,11]);list.push( [1,5,2,3,4,6,0,7,8,13,10,9,12,14,15,11]);list.push( [1,5,2,3,4,0,6,7,8,13,10,9,12,14,15,11]);list.push( [1,5,2,3,4,13,6,7,8,0,10,9,12,14,15,11]);list.push( [1,5,2,3,4,13,6,7,0,8,10,9,12,14,15,11]);list.push( [1,5,2,3,0,13,6,7,4,8,10,9,12,14,15,11]);list.push( [1,5,2,3,13,0,6,7,4,8,10,9,12,14,15,11]);list.push( [1,0,2,3,13,5,6,7,4,8,10,9,12,14,15,11]);list.push( [0,1,2,3,13,5,6,7,4,8,10,9,12,14,15,11]);list.push( [13,1,2,3,0,5,6,7,4,8,10,9,12,14,15,11]);list.push( [13,1,2,3,5,0,6,7,4,8,10,9,12,14,15,11]);list.push( [13,1,2,3,5,8,6,7,4,0,10,9,12,14,15,11]);list.push( [13,1,2,3,5,8,6,7,4,14,10,9,12,0,15,11]);list.push( [13,1,2,3,5,8,6,7,4,14,10,9,12,15,0,11]);list.push( [13,1,2,3,5,8,6,7,4,14,0,9,12,15,10,11]);list.push( [13,1,2,3,5,8,6,7,4,0,14,9,12,15,10,11]);list.push( [13,1,2,3,5,0,6,7,4,8,14,9,12,15,10,11]);list.push( [13,0,2,3,5,1,6,7,4,8,14,9,12,15,10,11]);list.push( [13,2,0,3,5,1,6,7,4,8,14,9,12,15,10,11]);list.push( [13,2,6,3,5,1,0,7,4,8,14,9,12,15,10,11]);list.push( [13,2,6,3,5,1,14,7,4,8,0,9,12,15,10,11]);list.push( [13,2,6,3,5,1,14,7,4,0,8,9,12,15,10,11]);list.push( [13,2,6,3,5,0,14,7,4,1,8,9,12,15,10,11]);list.push( [13,2,6,3,0,5,14,7,4,1,8,9,12,15,10,11]);list.push( [13,2,6,3,4,5,14,7,0,1,8,9,12,15,10,11]);list.push( [13,2,6,3,4,5,14,7,12,1,8,9,0,15,10,11]);list.push( [13,2,6,3,4,5,14,7,12,1,8,9,15,0,10,11]);list.push( [13,2,6,3,4,5,14,7,12,1,8,9,15,10,0,11]);list.push( [13,2,6,3,4,5,14,7,12,1,0,9,15,10,8,11]);list.push( [13,2,6,3,4,5,14,7,12,0,1,9,15,10,8,11]);list.push( [13,2,6,3,4,0,14,7,12,5,1,9,15,10,8,11]);list.push( [13,2,6,3,4,14,0,7,12,5,1,9,15,10,8,11]);list.push( [13,2,6,3,4,14,7,0,12,5,1,9,15,10,8,11]);list.push( [13,2,6,3,4,14,7,9,12,5,1,0,15,10,8,11]);list.push( [13,2,6,3,4,14,7,9,12,5,1,11,15,10,8,0]);list.push( [13,2,6,3,4,14,7,9,12,5,1,11,15,10,0,8]);list.push( [13,2,6,3,4,14,7,9,12,5,0,11,15,10,1,8]);list.push( [13,2,6,3,4,14,0,9,12,5,7,11,15,10,1,8]);list.push( [13,2,6,3,4,14,9,0,12,5,7,11,15,10,1,8]);list.push( [13,2,6,3,4,14,9,11,12,5,7,0,15,10,1,8]);list.push( [13,2,6,3,4,14,9,11,12,5,0,7,15,10,1,8]);list.push( [13,2,6,3,4,14,0,11,12,5,9,7,15,10,1,8]);list.push( [13,2,0,3,4,14,6,11,12,5,9,7,15,10,1,8]);list.push( [13,0,2,3,4,14,6,11,12,5,9,7,15,10,1,8]);list.push( [13,14,2,3,4,0,6,11,12,5,9,7,15,10,1,8]);list.push( [13,14,2,3,0,4,6,11,12,5,9,7,15,10,1,8]);list.push( [13,14,2,3,12,4,6,11,0,5,9,7,15,10,1,8]);list.push( [13,14,2,3,12,4,6,11,5,0,9,7,15,10,1,8]);list.push( [13,14,2,3,12,0,6,11,5,4,9,7,15,10,1,8]);list.push( [13,0,2,3,12,14,6,11,5,4,9,7,15,10,1,8]);list.push( [0,13,2,3,12,14,6,11,5,4,9,7,15,10,1,8]);list.push( [12,13,2,3,0,14,6,11,5,4,9,7,15,10,1,8]);list.push( [12,13,2,3,14,0,6,11,5,4,9,7,15,10,1,8]);list.push( [12,13,2,3,14,6,0,11,5,4,9,7,15,10,1,8]);list.push( [12,13,2,3,14,6,9,11,5,4,0,7,15,10,1,8]);list.push( [12,13,2,3,14,6,9,11,5,0,4,7,15,10,1,8]);list.push( [12,13,2,3,14,6,9,11,5,10,4,7,15,0,1,8]);list.push( [12,13,2,3,14,6,9,11,5,10,4,7,15,1,0,8]);list.push( [12,13,2,3,14,6,9,11,5,10,0,7,15,1,4,8]);list.push( [12,13,2,3,14,6,9,11,5,10,7,0,15,1,4,8]);list.push( [12,13,2,3,14,6,9,0,5,10,7,11,15,1,4,8]);list.push( [12,13,2,0,14,6,9,3,5,10,7,11,15,1,4,8]);list.push( [12,13,0,2,14,6,9,3,5,10,7,11,15,1,4,8]);list.push( [12,13,9,2,14,6,0,3,5,10,7,11,15,1,4,8]);list.push( [12,13,9,2,14,0,6,3,5,10,7,11,15,1,4,8]);list.push( [12,13,9,2,14,10,6,3,5,0,7,11,15,1,4,8]);list.push( [12,13,9,2,14,10,6,3,0,5,7,11,15,1,4,8]);list.push( [12,13,9,2,0,10,6,3,14,5,7,11,15,1,4,8]);list.push( [0,13,9,2,12,10,6,3,14,5,7,11,15,1,4,8]);
        var taille = list.length;
        var randomnumber = Math.floor(Math.random() * (taille));
        $scope.lists = list[randomnumber];
    }else if($scope.nombre==5){
        var list=[];
        list.push( [1,2,7,3,4,5,6,13,12,9,10,11,0,8,14,15,16,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,5,6,13,12,9,10,0,11,8,14,15,16,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,5,0,13,12,9,10,6,11,8,14,15,16,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,0,5,13,12,9,10,6,11,8,14,15,16,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,0,6,11,8,14,15,16,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,6,11,8,14,0,16,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,6,11,8,14,16,0,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,0,11,8,14,16,6,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,0,8,14,16,6,17,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,17,8,14,16,6,0,18,19,20,21,22,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,17,8,14,16,6,22,18,19,20,21,0,23,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,17,8,14,16,6,22,18,19,20,21,23,0,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,17,8,14,16,6,22,0,19,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,17,8,14,16,6,0,22,19,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,0,8,14,16,6,17,22,19,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,8,0,14,16,6,17,22,19,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,8,14,0,16,6,17,22,19,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,8,14,19,16,6,17,22,0,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,8,14,19,16,6,17,0,22,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,12,9,15,11,8,0,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,0,9,15,11,8,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,7,3,4,10,5,13,9,0,15,11,8,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,7,3,0,10,5,13,9,4,15,11,8,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,7,0,3,10,5,13,9,4,15,11,8,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,0,7,3,10,5,13,9,4,15,11,8,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,10,5,0,9,4,15,11,8,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,10,5,8,9,4,15,11,0,12,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,10,5,8,9,4,15,11,12,0,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,10,5,8,0,4,15,11,12,9,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,10,5,0,8,4,15,11,12,9,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,10,0,5,8,4,15,11,12,9,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,0,10,5,8,4,15,11,12,9,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,0,11,12,9,19,16,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,11,12,9,19,0,6,17,14,22,20,21,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,11,12,9,19,20,6,17,14,22,0,21,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,11,12,9,19,20,6,17,14,22,21,0,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,11,12,9,19,20,0,17,14,22,21,6,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,0,12,9,19,20,11,17,14,22,21,6,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,12,0,9,19,20,11,17,14,22,21,6,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,12,17,9,19,20,11,0,14,22,21,6,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,12,17,9,19,20,11,14,0,22,21,6,23,18,24]);list.push( [1,2,13,7,3,15,10,5,8,4,16,12,17,0,19,20,11,14,9,22,21,6,23,18,24]);list.push( [1,2,13,7,3,15,10,5,0,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [1,2,13,0,3,15,10,5,7,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [1,2,0,13,3,15,10,5,7,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [1,0,2,13,3,15,10,5,7,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [0,1,2,13,3,15,10,5,7,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [15,1,2,13,3,0,10,5,7,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [15,1,2,13,3,10,0,5,7,4,16,12,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,0,17,8,19,20,11,14,9,22,21,6,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,11,17,8,19,20,0,14,9,22,21,6,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,11,17,8,19,0,20,14,9,22,21,6,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,11,17,8,19,21,20,14,9,22,0,6,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,11,17,8,19,21,20,14,9,22,6,0,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,11,17,8,19,21,0,14,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,16,0,17,8,19,21,11,14,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,0,16,17,8,19,21,11,14,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,21,16,17,8,19,0,11,14,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,21,16,17,8,19,11,0,14,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,21,16,17,8,19,11,14,0,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,21,16,0,8,19,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,7,4,21,16,8,0,19,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,5,0,4,21,16,8,7,19,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,0,5,4,21,16,8,7,19,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,8,5,4,21,16,0,7,19,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,8,5,4,21,16,7,0,19,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,8,5,4,21,16,7,19,0,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,8,5,0,21,16,7,19,4,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,13,3,10,12,8,0,5,21,16,7,19,4,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,0,3,10,12,8,13,5,21,16,7,19,4,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,3,0,10,12,8,13,5,21,16,7,19,4,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,3,5,10,12,8,13,0,21,16,7,19,4,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,0,11,14,17,9,22,6,20,23,18,24]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,17,9,0,6,20,23,18,24]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,17,0,9,6,20,23,18,24]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,17,18,9,6,20,23,0,24]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,17,18,9,6,20,23,24,0]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,17,18,0,6,20,23,24,9]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,17,0,18,6,20,23,24,9]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,7,19,22,11,14,0,17,18,6,20,23,24,9]);list.push( [15,1,2,3,5,10,12,8,13,4,21,16,0,19,22,11,14,7,17,18,6,20,23,24,9]);list.push( [15,1,2,3,5,10,12,0,13,4,21,16,8,19,22,11,14,7,17,18,6,20,23,24,9]);list.push( [15,1,2,3,5,10,12,13,0,4,21,16,8,19,22,11,14,7,17,18,6,20,23,24,9]);list.push( [15,1,2,3,5,10,12,13,19,4,21,16,8,0,22,11,14,7,17,18,6,20,23,24,9]);
        var taille = list.length;
        var randomnumber = Math.floor(Math.random() * (taille));
        $scope.lists = list[randomnumber];
    }

})

;
