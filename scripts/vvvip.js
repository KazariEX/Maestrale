import fs from "fs-extra";
import path from "path";

pick({
    filename: "ship_data_blueprint.json",
    folder: "ShareCfg",
    props: [
        "fate_strengthen",
        "strengthen_effect"
    ]
});

pick({
    filename: "ship_data_strengthen.json",
    folder: "ShareCfg",
    props: [
        "durability"
    ]
});

pick({
    filename: "ship_skin_template.json",
    folder: "ShareCfg",
    props: [
        "name",
        "painting"
    ]
});

pick({
    filename: "ship_strengthen_blueprint.json",
    folder: "ShareCfg",
    props: [
        "effect",
        "effect_attr",
        "lv",
        "need_exp"
    ]
})

pick({
    filename: "ship_data_statistics.json",
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

pick({
    filename: "ship_data_template.json",
    folder: "sharecfgdata",
    props: [
        "oil_at_end",
        "oil_at_start",
    ]
});

//属性过滤
async function pick({ filename, folder, props } = {}) {
    const i = path.resolve("../data", folder, filename);
    const o = path.resolve("../data", "ShareCfg(VVVIP)", filename);

    const file = await fs.readFile(i);
    const j = JSON.parse(file.toString());

    const res = {};
    for (const id in j) {
        res[id] = {};
        for (const key of props) {
            res[id][key] = j[id][key];
        }
    }

    fs.outputFile(o, JSON.stringify(res));
}