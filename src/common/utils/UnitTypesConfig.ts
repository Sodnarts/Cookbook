import { getLanguageFile } from 'src/common/internationalization/lang';
import { UnitTypes } from 'src/redux/reducers/IState';

const lang = getLanguageFile();
export interface IUnitType {
    value: string;
    label: string;
}

export const unitTypesList: IUnitType[] = [
    {value: UnitTypes.Grams, label: lang.g[1]},
    {value: UnitTypes.Kilograms, label: lang.kg[1]},
    {value: UnitTypes.Millilitres, label: lang.ml[1]},
    {value: UnitTypes.Desilitres, label: lang.dl[1]},
    {value: UnitTypes.Litres, label: lang.l[1]},
    {value: UnitTypes.Pieces, label: lang.pcs[1]},
    {value: UnitTypes.Tablespoon, label: lang.tbsp[1]},
    {value: UnitTypes.Teaspoon, label: lang.tsp[1]},
]
