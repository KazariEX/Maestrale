import fs from "fs-extra";
import path from "path";

const ship_data_blueprint = pick({
    filename: "ship_data_blueprint",
    folder: "ShareCfg",
    props: [
        "fate_strengthen",
        "strengthen_effect"
    ]
});

const ship_data_strengthen = pick({
    filename: "ship_data_strengthen",
    folder: "ShareCfg",
    props: [
        "durability"
    ]
});

const ship_skin_template = pick({
    filename: "ship_skin_template",
    folder: "ShareCfg",
    props: [
        "name",
        "painting"
    ]
});

const ship_strengthen_blueprint = pick({
    filename: "ship_strengthen_blueprint",
    folder: "ShareCfg",
    props: [
        "effect",
        "effect_attr",
        "lv",
        "need_exp"
    ]
});

const equip_data_statistics = pick({
    filename: "equip_data_statistics",
    folder: "sharecfgdata",
    props: [
        "attribute_1",
        "attribute_2",
        "attribute_3",
        "icon",
        "name",
        "nationality",
        "rarity",
        "tech",
        "type",
        "value_1",
        "value_2",
        "value_3",
        "weapon_id"
    ]
});

const equip_data_template = pick({
    filename: "equip_data_template",
    folder: "sharecfgdata",
    props: [
        "next",
        "prev",
        "ship_type_forbidden"
    ]
});

const ship_data_statistics = pick({
    filename: "ship_data_statistics",
    folder: "sharecfgdata",
    props: [
        "ammo",
        "armor_type",
        "attrs",
        "attrs_growth",
        "name",
        "nationality",
        "oxy_max",
        "rarity",
        "star",
        "type"
    ]
});

const ship_data_template = pick({
    filename: "ship_data_template",
    folder: "sharecfgdata",
    props: [
        "equip_1",
        "equip_2",
        "equip_3",
        "equip_4",
        "equip_5",
        "oil_at_end",
        "oil_at_start"
    ]
});

const spweapon_data_statistics = pick({
    filename: "spweapon_data_statistics",
    folder: "sharecfgdata",
    props: [
        "attribute_1",
        "attribute_2",
        "icon",
        "name",
        "next",
        "prev",
        "rarity",
        "type",
        "unique",
        "value_1",
        "value_1_random",
        "value_2",
        "value_2_random"
    ]
});

const spweapon_type = pick({
    filename: "spweapon_type",
    folder: "ShareCfg",
    props: [
        "ship_type"
    ]
});

//属性过滤
function pick({ filename, folder, props } = {}) {
    return async function() {
        const i = path.resolve("../data", folder, filename + ".json");
        const o = path.resolve("../data", "ShareCfg(VVVIP)", filename + ".json");

        const file = await fs.readFile(i);
        const j = JSON.parse(file.toString());

        const res = {};
        for (const id in j) {
            res[id] = {};
            for (const key of props) {
                if (key in j[id]) {
                    res[id][key] = j[id][key];
                }
            }
        }

        fs.outputFile(o, JSON.stringify(res));
    };
}

/* ----------------------------------- */

// ship_data_blueprint();
// ship_data_strengthen();
// ship_skin_template();
// ship_strengthen_blueprint();
// equip_data_statistics();
// equip_data_template();
// ship_data_statistics();
// ship_data_template();
// spweapon_data_statistics();
// spweapon_type();

/* ----------------------------------- */