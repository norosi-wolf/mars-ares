
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
};

function updateValue(id, addValue)
{
    let v = UserDatas[id];
    v += addValue;

    if (v < 0) v = 0;
    if (999 < v) v = 999;

    if (v != UserDatas[id])
    {
        UndoDatas.unshift([{id: id, value: v - UserDatas[id]}]);
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

    UndoDatas.unshift(undoData);
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