
var baseLang = "en";
var btnGetLatLonLocalizedText = "SHOW VIEW";
var btnUseCurrentLocationLocalizedText = "JUST USE MY CURRENT LOCATION";
var lblLocationNotSetLocalizedText = "Where on earth do you want to view the Space Station?";
var lblZipLocalizedText = "Nearest City";
var storedLocationsLocalizedText = "Your Locations:";
var clearLocationsLocalizedText = "(REMOVE ALL)";
var getNewerViewingInfo = "Get newer viewing info?";
var thisViewingIsOld = "This viewing is old";
var resumeWindowButtons = "Yes, No - Let me see the previous view";

//Messages:
var doYouReallyWantToRemoveLocalizedText = "Do you really want to delete all stored display locations?";
var geocodeZeroResults = "Location not found. doublecheck spelling? Try a larger city?";
var geocodeInvalidRequest = "We could not determine your location. The error returned usually means either no ZIP was entered, or the zip or address was not valid.";
var geocodeOverQueryLimit = "We are over our quota of calls to the Google location service. Try again later.";
var geocodeRequestDenied = "Our attempt to determine your location was denied for some reason.";
var geocodeGeneric = "An error occurred, but the location finder did not tell us what is wrong. Make sure you are connected to the internet: ";
var uhaapiNoSatellite = "Trouble retrieving pass info for that location: \nThe error code indicates a specific address or zip code may be required. \n\nSorry for the additional keystrokes.";
var enableLocation = "For one-click viewing, you should<br /><strong style='font-size:14px;color:#449'>Enable Location</strong><br /> (under Android <em>Settings</em>)<br />(You won't have to type  in a city any more!)";

var specialMessageLocalizedText = "There are very few viewing opportunities"
var noteLocalizedText = "NOTE: ";

if (navigator.userLanguage)//IE specific
    baseLang = navigator.userLanguage.substring(0, 2).toLowerCase();
else
    baseLang = navigator.language.substring(0, 2).toLowerCase();

switch (baseLang) {
    case "it": //Italian
        doYouReallyWantToRemoveLocalizedText = "Sei sicuro di voler eliminare tutte le località di visualizzazione memorizzati?";
        btnGetLatLonLocalizedText = "MOSTRA VISTA";
        btnUseCurrentLocationLocalizedText = "USA MIA POZIZIONE CORRENTE";
        lblLocationNotSetLocalizedText = "Dove diavolo si desidera visualizzare la Stazione Spaziale?";
        lblZipLocalizedText = "città";
        storedLocationsLocalizedText = "Delle posizioni:";
        clearLocationsLocalizedText = " (RIMUOVERE TUTTI)";
        getNewerViewingInfo = "Prendi recente Visualizzazione Info?";
        thisViewingIsOld = "Questa visione è vecchio";
        resumeWindowButtons = "Sì, No - Fammi vedere la vista precedente";
        //Messages
        geocodeZeroResults = "Il geocode era successo, ma non ha prodotto risultati. Ciò può verificarsi se un ZIP inesistente o non valido o l'indirizzo è stato inserito. Prova di nuovo. (forse alcuni caratteri non alfanumerici stanno causando un problema)";
        geocodeInvalidRequest = "Non è stato possibile determinare la propria posizione. L'errore restituito di solito significa sia nessuna città è stato inserito o la città non era valido.";
        geocodeOverQueryLimit = "Siamo sopra la nostra quota di chiamate al servizio di localizzazione di Google. Riprovare più tardi.";
        geocodeRequestDenied = "Il nostro tentativo di determinare la posizione è stato negato.";
        geocodeGeneric = "È verificato un errore, ma il cercatore di posizione non ci ha detto ciò che è sbagliato. Assicurarsi di essere connessi a Internet:";
        uhaapiNoSatellite = "Stiamo avendo problemi recuperando informazioni pass per quella posizione: \nIl codice di errore indica un indirizzo specifico o il codice postale può essere richiesto. \n\nSorry per le combinazioni di tasti.";
        enableLocation = "Abilita Location (in Impostazioni) per un clic di visualizzazione. (Non dovrete digitare un nome di città più)";
        break;
    case "nl": //Dutch - Netherlands
        doYouReallyWantToRemoveLocalizedText = "Bent u echt willen schrappen alle opgeslagen aanwijsplaat plaatsen?";
        btnGetLatLonLocalizedText = "Weergeven";
        btnUseCurrentLocationLocalizedText = "Gebruik mijn huidige locatie";
        lblLocationNotSetLocalizedText = "Waar ter wereld wilt u het ruimtestation te bekijken?";
        lblZipLocalizedText = "City";
        storedLocationsLocalizedText = "Uw Locaties:";
        clearLocationsLocalizedText = " (VERWIJDER ALLE)";
        getNewerViewingInfo = "Krijgen Nieuwer Bekijkt Info?";
        thisViewingIsOld = "Deze weergave is oud";
        resumeWindowButtons = "Ja, Nee - Laat me de vorige weergave";
        //Messages
        geocodeZeroResults = "De Geocode was succesvol, maar heeft geen resultaten opgeleverd. Dit kan gebeuren als een niet-bestaand of ongeldig ZIP of het adres is ingevoerd. proberen weer. (misschien een aantal niet-alfanumerieke tekens veroorzaken een probleem)";
        geocodeInvalidRequest = "We konden niet het bepalen van uw locatie. De fout betekent meestal dat het adres niet geldig was.";
        geocodeOverQueryLimit = "Wij zijn over onze quotum van oproepen naar de Google-locatie dienst. Probeer het later opnieuw.";
        geocodeRequestDenied = "Onze poging om je locatie te bepalen werd geweigerd om een ​​bepaalde reden.";
        geocodeGeneric = "Er is een fout opgetreden, Zorg ervoor dat u verbonden bent met het internet:";
        uhaapiNoSatellite = "Problemen ophalen van pas info voor die locatie: \nDe error code geeft een specifiek adres of postcode nodig zijn. \n \nSorry voor de extra toetsaanslagen.";
        enableLocation = "Inschakelen Locatie (onder Instellingen) voor een-klik bekijken. (U hoeft niet een naam van een stad niet meer te typen)";
        break;
    case "es": //Spanish
        doYouReallyWantToRemoveLocalizedText = "¿Realmente desea eliminar todas las ubicaciones de visualización almacenada?";
        btnGetLatLonLocalizedText = "Vista desde esta ubicación";
        btnUseCurrentLocationLocalizedText = "Utilizar mi ubicación actual";
        lblLocationNotSetLocalizedText = "Donde en la tierra usted desea ver?";
        lblZipLocalizedText = "Ciudad";
        storedLocationsLocalizedText = "Ubicaciones almacenados";
        clearLocationsLocalizedText = " (ELIMINAR TODOS)";
        getNewerViewingInfo = "Obtén más reciente Viendo informaciones?";
        thisViewingIsOld = "Esta visión es viejo";
        resumeWindowButtons = "Sí, No - Déjame ver la vista previa";
        //Messages
        geocodeZeroResults = "La codificación geográfica fue un éxito, pero no tuvo ningún resultado. Esto puede ocurrir si una postal no existe o es inválida o la dirección se ha introducido. Inténtelo de nuevo. (tal vez algunos caracteres no alfanuméricos están causando un problema)";
        geocodeInvalidRequest = "No se pudo determinar su ubicación. El error suele significar o bien no se ha introducido ZIP, o el código postal o la dirección no era válida.";
        geocodeOverQueryLimit = "Estamos en nuestra cuota de llamadas al servicio de localización de Google. Inténtelo más tarde.";
        geocodeRequestDenied = "Nuestro intento de determinar su ubicación se le negó por alguna razón.";
        geocodeGeneric = "Ha ocurrido un error, pero el buscador de ubicaciones no nos dicen lo que está mal. Asegúrese de que está conectado a Internet:";
        uhaapiNoSatellite = "Problemas para recuperar información pasar por ese lugar: \nEl código de error indica una dirección específica o código postal puede ser requerida. \n\nSorry de las pulsaciones de teclas adicionales.";
        enableLocation = "Activar Ubicación (en Configuración) para un solo clic de visualización. (Usted no tiene que escribir un nombre de ciudad más)"
        break;
    case "ru": //Russian
        doYouReallyWantToRemoveLocalizedText = "Вы действительно хотите удалить все сохраненные местах экрана?";
        btnGetLatLonLocalizedText = "Вид с этого места";
        btnUseCurrentLocationLocalizedText = "Использовать мое настоящее место";
        lblLocationNotSetLocalizedText = "Где же ты хочешь, чтобы посмотреть откуда?";
        lblZipLocalizedText = "город";
        storedLocationsLocalizedText = "Хранимые проведения";
        clearLocationsLocalizedText = " (Удалить все)";
        enableLocation = "Включить Location (в меню Настройки) для просмотра один клик. (Вам не придется вводить название города больше)";
        getNewerViewingInfo = "Получить Новее Просмотр информация?";
        thisViewingIsOld = "Этот визуальный осмотр стар";
        resumeWindowButtons = "Да, нет - Позвольте мне см. предыдущий вид";
        //Messages
        geocodeZeroResults = "Геокодирование прошла успешно, но не дал результатов. Это может произойти, если несуществующего или недействительного ZIP или адрес был введен. Попробуйте еще раз. (может быть, некоторые не алфавитно-цифровые символы вызывают проблемы)";
        geocodeInvalidRequest = "Мы не могли определить ваше местоположение.Ошибка обычно означает, адрес не был в силе.";
        geocodeOverQueryLimit = "Мы над нашей квоте звонков на расположение службы Google. Попробуйте еще ​​раз позже.";
        geocodeRequestDenied = "Наша попытка определить ваше местоположение было отказано по некоторым причинам.";
        geocodeGeneric = "Произошла ошибка, но расположение видоискателя не сказал нам, что это неправильно. Убедитесь, что вы подключены к Интернету:";
        uhaapiNoSatellite = "Проблема получения информации пройти для этого места:\nВ код ошибки указывает на определенный адрес или почтовый индекс может оказаться необходимым.\п\nSorry для дополнительных клавиш.";
        break;
}

function setLocalizedText() {
    $("#btnGetLatLon").attr("value", btnGetLatLonLocalizedText);
    $("#btnUsePhoneLatLon").text(btnUseCurrentLocationLocalizedText);
    $("#lblLocationNotSet").text(lblLocationNotSetLocalizedText);
    $("#lblZip").text(lblZipLocalizedText);
    $("#lblStoredLocations").text(storedLocationsLocalizedText);
    $("#lblClearLocations").text(clearLocationsLocalizedText);
    $("#enableLocation").html(enableLocation);
}