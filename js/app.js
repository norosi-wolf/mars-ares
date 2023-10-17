
var UserDatas = {
    // Board
    tr: 0,
    // Productions
    pMc: 0,
    pCard: 0,
    pHeat: 0,
    pPlant: 0,
    // Resources
    rMc: 0,
    rHeat: 0,
    rPlant: 0,
    rSteel: 0,
    rTitanium: 0,

};

var UndoDatas = [];

var CpuPhase = {
    current: 0,
    deck: [],
};


function initialize()
{
    $('#generate').click(function(){generate();});
    $('#undo').click(function(){undo();});

    $('#tr-m').click(function(){updateValue("tr", -1);});
    $('#tr-p').click(function(){updateValue("tr", 1);});

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

    $('.phase0').show();
    $('.phase1').hide();
    $('.phase2').hide();
    $('.phase3').hide();
    $('.phase4').hide();
    $('.phase5').hide();
    
    $('.phase0').click(function(){nextCpuPhase();});
    $('.phase1').click(function(){nextCpuPhase();});
    $('.phase2').click(function(){nextCpuPhase();});
    $('.phase3').click(function(){nextCpuPhase();});
    $('.phase4').click(function(){nextCpuPhase();});
    $('.phase5').click(function(){nextCpuPhase();});
};

function updateValue(id, addValue)
{
    let v = UserDatas[id];
    v += addValue;

    if (v < 0) v = 0;
    if (999 < v) v = 999;

    if (v != UserDatas[id])
    {
        addUndo([{id: id, value: v - UserDatas[id]}]);
        UserDatas[id] = v;
        $(`#${id}-v`).text(UserDatas[id]);
    }
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
    if (0 < UndoDatas.length)
    {
        let undoData = UndoDatas.shift();
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
    UndoDatas.unshift(data);
    if (10 < UndoDatas.length)
    {
        UndoDatas.pop();
    }
};


function nextCpuPhase()
{
    if (CpuPhase.current == 0)
    {
        CpuPhase.deck = shuffleArray([1,2,3,4,5]);
        CpuPhase.current = CpuPhase.deck.shift();
    }
    else if (0 < CpuPhase.deck.length)
    {
        CpuPhase.current = CpuPhase.deck.shift();
    }
    else
    {
        CpuPhase.current = 0;
    }
    
    updateCpuPhase(CpuPhase.current);
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