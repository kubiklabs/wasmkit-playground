import { MsgObject } from "../types/dataTypes";
import { camelToSnake } from "../utils/helpers";

export const useReadSchema = () => {
  const getInputs = (message: any, convertedString: string) => {
    let paramsArray: any[] = [];
    let updatedMsg: MsgObject = {};

    //Extract the type string from the properties key
    let match = message?.type.match(
      /\{([^}]*)\}\s*:\s*\{([^}]*)\}[\s,]*?(?=,|\))/g
    );
    if (match) {
      const paramTypesArr: any[] = [];

      //Use regex to extract the param and their types
      let newObj: any = {};
      match.forEach((paramMatch: any) => {
        const [, paramNames, paramTypes] = paramMatch.match(
          /\{([^}]*)\}\s*:\s*\{([^}]*)\}/
        );

        const props = paramNames.trim().split(/,\s+/); //only params array
        const types = paramTypes.trim().split(/;\s+/); //params with their types
        console.log(props, types);

        props.forEach((prop: any, i: any) => {
          const propName = prop.trim();
          const propType = types[i].trim().replace(/\?$/, "");

          paramTypesArr.push({ name: propName, type: propType });
        });
      });

      paramTypesArr.forEach((val) => {
        const isOptional = val.type.includes("?");
        const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
        if (!isOptional) newObj[camelToSnake(val.name)] = "";

        paramsArray.push({
          name: val.name,
          type: typeName,
          isOptional,
        });
      });
      updatedMsg = {
        [convertedString]: newObj,
      };
    } else {
      updatedMsg = {
        [convertedString]: {},
      };
    }

    return { updatedMsg, paramsArray };
  };

  return { getInputs };
};
