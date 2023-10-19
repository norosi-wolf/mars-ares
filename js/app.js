
const APP_VERSION = '1.0.8';
const TEMPERATURE_LIST = [-30, -28, -26, -24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8];
const OXYGEN_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var isScroll = true;

var UserDatas = {
    // Board
    tr: 0,
    oxygen: 0,
    temperature: 0,
    // Productions
    pMc: 0,
    pCard: 0,
    pHeat: 0,
    pPlant: 0,
    undoDatas: [],
    // Resources
    rMc: 0,
    rHeat: 0,
    rPlant: 0,
    rSteel: 0,
    rTitanium: 0,
    rForest: 0,
    // CPU
    cpuPhase: {
        current: 0,
        deck: [],
    },
};



function initialize()
{
    $('#info-version').text(`verson: ${APP_VERSION}`);

    resetValues();

    $('#undo').click(function(){undo();});

    $('#tr-m').click(function(){updateValue("tr", -1);});
    $('#tr-p').click(function(){updateValue("tr", 1);});

    $('#oxygen-m').click(function(){updateValueOxygen(-1);});
    $('#oxygen-p').click(function(){updateValueOxygen(1);});
    $('#temperature-m').click(function(){updateValueTemperature(-1);});
    $('#temperature-p').click(function(){updateValueTemperature(1);});

    $('#pMc-m').click(function(){updateValue("pMc", -1);});
    $('#pMc-p').click(function(){updateValue("pMc", 1);});
    $('#pCard-m').click(function(){updateValue("pCard", -1);});
    $('#pCard-p').click(function(){updateValue("pCard", 1);});
    $('#pHeat-m').click(function(){updateValue("pHeat", -1);});
    $('#pHeat-p').click(function(){updateValue("pHeat", 1);});
    $('#pPlant-m').click(function(){updateValue("pPlant", -1);});
    $('#pPlant-p').click(function(){updateValue("pPlant", 1);});

    $('#rMc-mm').click(function(){updateValue("rMc", -10);});
    $('#rMc-m').click(function(){updateValue("rMc", -1);});
    $('#rMc-p').click(function(){updateValue("rMc", 1);});
    $('#rMc-pp').click(function(){updateValue("rMc", 10);});
    $('#rHeat-mm').click(function(){updateValue("rHeat", -10);});
    $('#rHeat-m').click(function(){updateValue("rHeat", -1);});
    $('#rHeat-p').click(function(){updateValue("rHeat", 1);});
    $('#rHeat-pp').click(function(){updateValue("rHeat", 10);});
    $('#rPlant-mm').click(function(){updateValue("rPlant", -10);});
    $('#rPlant-m').click(function(){updateValue("rPlant", -1);});
    $('#rPlant-p').click(function(){updateValue("rPlant", 1);});
    $('#rPlant-pp').click(function(){updateValue("rPlant", 10);});
    $('#rSteel-mm').click(function(){updateValue("rSteel", -10);});
    $('#rSteel-m').click(function(){updateValue("rSteel", -1);});
    $('#rSteel-p').click(function(){updateValue("rSteel", 1);});
    $('#rSteel-pp').click(function(){updateValue("rSteel", 10);});
    $('#rTitanium-mm').click(function(){updateValue("rTitanium", -10);});
    $('#rTitanium-m').click(function(){updateValue("rTitanium", -1);});
    $('#rTitanium-p').click(function(){updateValue("rTitanium", 1);});
    $('#rTitanium-pp').click(function(){updateValue("rTitanium", 10);});
    $('#rForest-mm').click(function(){updateValue("rForest", -10);});
    $('#rForest-m').click(function(){updateValue("rForest", -1);});
    $('#rForest-p').click(function(){updateValue("rForest", 1);});
    $('#rForest-pp').click(function(){updateValue("rForest", 10);});

    $('#tile-sea1').click(function(){openTileSea('tile-sea1');});
    $('#tile-sea2').click(function(){openTileSea('tile-sea2');});
    $('#tile-sea3').click(function(){openTileSea('tile-sea3');});
    $('#tile-sea4').click(function(){openTileSea('tile-sea4');});
    $('#tile-sea5').click(function(){openTileSea('tile-sea5');});
    $('#tile-sea6').click(function(){openTileSea('tile-sea6');});
    $('#tile-sea7').click(function(){openTileSea('tile-sea7');});
    $('#tile-sea8').click(function(){openTileSea('tile-sea8');});
    $('#tile-sea9').click(function(){openTileSea('tile-sea9');});

    $('#submitGenerate').click(function(){
        closeModal('modal-generate');
        generate();
    });

    $('#submitReset').click(function(){
        closeModal('modal-reset');
        resetValues();
    });

    $('#applyClearCache').click(function(){
        closeModal('modal-cache');
        clearCache();
    });

    $('.phase0').show();
    $('.phase1').hide();
    $('.phase2').hide();
    $('.phase3').hide();
    $('.phase4').hide();
    $('.phase5').hide();
    $('#phase-m').click(function(){nextCpuPhase(-1);});
    $('#phase-p').click(function(){nextCpuPhase(1);});

    window.addEventListener("scroll", (e) => {
        if (isScroll) return;
        e.preventDefault();
        window.scrollTo(0, 0);
    });
    
    /*
    $('.phase0').click(function(){nextCpuPhase();});
    $('.phase1').click(function(){nextCpuPhase();});
    $('.phase2').click(function(){nextCpuPhase();});
    $('.phase3').click(function(){nextCpuPhase();});
    $('.phase4').click(function(){nextCpuPhase();});
    $('.phase5').click(function(){nextCpuPhase();});
    */
};

function resetValues()
{
    UserDatas.tr = 0;
    UserDatas.oxygen = 0;
    UserDatas.temperature = 0;
    UserDatas.pMc = 0;
    UserDatas.pCard = 0;
    UserDatas.pHeat = 0;
    UserDatas.pPlant = 0;    
    UserDatas.rMc = 0;
    UserDatas.rHeat = 0;
    UserDatas.rPlant = 0;
    UserDatas.rSteel = 0;
    UserDatas.rTitanium = 0;
    UserDatas.rForest = 0;
    UserDatas.undoDatas = [];
    UserDatas.cpuPhase.current = 0;
    UserDatas.cpuPhase.deck = [];

    let ary = [];
    for (let i = 0; i < 100; i++)
    {
        ary = shuffleArray([1, 2, 3, 4, 5]);
        ary.unshift(0);
        UserDatas.cpuPhase.deck = UserDatas.cpuPhase.deck.concat(ary);
    }

    //
    updateValueOxygen(0);
    updateValueTemperature(0);
    updateValue("tr", 0);
    updateValue("pMc", 0);
    updateValue("pCard", 0);
    updateValue("pHeat", 0);
    updateValue("pPlant", 0);
    updateValue("rMc", 0);
    updateValue("rHeat", 0);
    updateValue("rPlant", 0);
    updateValue("rSteel", 0);
    updateValue("rTitanium", 0);
    updateValue("rForest", 0);
    nextCpuPhase(0);

    //
    let tileSeaList = $('.tile-sea');
    let tmpAry = [];
    let i = 0;
    for (i = 0; i < tileSeaList.length; i++)
    {
        if ($(tileSeaList[i]).hasClass('tile-sea-o')) $(tileSeaList[i]).removeClass('tile-sea-o');
        if ($(tileSeaList[i]).hasClass('tile-sea-c') == false) $(tileSeaList[i]).addClass('tile-sea-c');
        $(tileSeaList[i]).find('.tile-on').hide();
        $(tileSeaList[i]).find('.tile-off').show();
        tmpAry.push($(tileSeaList[i]).html());
    }

    tmpAry = shuffleArray(tmpAry);
    for (i = 0; i < tmpAry.length; i++)
    {
        $(`#tile-sea${i+1}`).html(tmpAry[i]);
    }
};

function updateValue(id, addValue)
{
    UserDatas[id] += addValue;
    if (UserDatas[id] < 0) UserDatas[id] = 0;
    if (999 < UserDatas[id]) UserDatas[id] = 999;
    $(`#${id}-v`).text(UserDatas[id]);
};

function updateValueOxygen(addValue)
{
    UserDatas.oxygen += addValue;
    if (UserDatas.oxygen < 0) UserDatas.oxygen = 0;
    if (OXYGEN_LIST.length - 1 < UserDatas.oxygen) UserDatas.oxygen = OXYGEN_LIST.length - 1;
    $('#oxygen-v').text(`${OXYGEN_LIST[UserDatas.oxygen]} %`);
};

function updateValueTemperature(addValue)
{
    UserDatas.temperature += addValue;
    if (UserDatas.temperature < 0) UserDatas.temperature = 0;
    if (TEMPERATURE_LIST.length - 1 < UserDatas.temperature) UserDatas.temperature = TEMPERATURE_LIST.length - 1;
    $('#temperature-v').text(`${TEMPERATURE_LIST[UserDatas.temperature]} ˚C`);
};



function generate()
{
    let v;
    let undoData = [];

    v = UserDatas.rMc;
    v += UserDatas.pMc + UserDatas.tr;
    if (v < 0) v = 0;
    if (999 < v) v = 999;
    if (v != UserDatas.rMc)
    {
        undoData.push({id:'rMc', value:v - UserDatas.rMc});
        UserDatas.rMc = v;
        $(`#rMc-v`).text(UserDatas.rMc);
    }

    v = UserDatas.rPlant;
    v += UserDatas.pPlant;
    if (v < 0) v = 0;
    if (999 < v) v = 999;
    if (v != UserDatas.rPlant)
    {
        undoData.push({id:'rPlant', value:v - UserDatas.rPlant});
        UserDatas.rPlant = v;
        $(`#rPlant-v`).text(UserDatas.rPlant);
    }

    v = UserDatas.rHeat;
    v += UserDatas.pHeat;
    if (v < 0) v = 0;
    if (999 < v) v = 999;
    if (v != UserDatas.rHeat)
    {
        undoData.push({id:'rHeat', value:v - UserDatas.rHeat});
        UserDatas.rHeat = v;
        $(`#rHeat-v`).text(UserDatas.rHeat);
    }    

    addUndo(undoData);
};

function undo()
{
    if (0 < UserDatas.undoDatas.length)
    {
        let undoData = UserDatas.undoDatas.shift();
        let id, value;
        for (let i = 0; i < undoData.length; i++)
        {
            id = undoData[i]['id'];
            value = undoData[i]['value'];
            UserDatas[id] -= value;
            $(`#${id}-v`).text(UserDatas[id]);
        }
    }
};

function addUndo(data)
{
    UserDatas.undoDatas.unshift(data);
    if (10 < UserDatas.undoDatas.length)
    {
        UserDatas.undoDatas.pop();
    }
};


function nextCpuPhase(addValue)
{
    UserDatas.cpuPhase.current += addValue;
    if (UserDatas.cpuPhase.current < 0)
    {
        UserDatas.cpuPhase.current = 0;
    }
    if (UserDatas.cpuPhase.deck.length - 1 < UserDatas.cpuPhase.current)
    {
        UserDatas.cpuPhase.current = UserDatas.cpuPhase.deck.length - 1;
    }

    updateCpuPhase(UserDatas.cpuPhase.deck[UserDatas.cpuPhase.current]);
    $('#phase-round-text').text(`Round - ${Math.floor(UserDatas.cpuPhase.current / 6)}`);
};

function updateCpuPhase(phase)
{
    for (let i = 0; i <= 5; i++)
    {
        if (phase == i)
        {
            $(`.phase${i}`).show();
        }
        else
        {
            $(`.phase${i}`).hide();
        }
    }
};

function openTileSea(id)
{
    let p = $(`#${id}`);
    if (p.hasClass('tile-sea-c'))
    {
        p.removeClass('tile-sea-c');
        p.addClass('tile-sea-o');
        p.find('.tile-off').hide();
        p.find('.tile-on').show();
    }
    else
    {
        p.removeClass('tile-sea-o');
        p.addClass('tile-sea-c');
        p.find('.tile-on').hide();
        p.find('.tile-off').show();
    }
};

function shuffleArray(array)
{
    let k;
    for (let i = array.length; 1 < i; i--)
    {
        k = Math.floor(Math.random() * i);
        [array[k], array[i - 1]] = [array[i - 1], array[k]];
    }
    return array;
};

function openModal(id)
{
    $(`#${id}`).show();
    $('html').css('overflow-y', 'hidden');
    forbidScroll();
};

function closeModal(id)
{
    $(`#${id}`).hide();
    $('html').css('overflow-y', '');
    allowScroll();
};

var scrollY;
function allowScroll()
{
    isScroll = true;
    //$('html').removeClass('no_scroll');
    //$('body').removeClass('no_scroll');
    //$(window).scrollTop(scrollY);
};

function forbidScroll()
{
    isScroll = false;
    //$('html').addClass('no_scroll');
    //$('body').addClass('no_scroll');
    //scrollY = $(window).scrollTop();
};

function clearCache()
{
    window.location.reload(true);
};