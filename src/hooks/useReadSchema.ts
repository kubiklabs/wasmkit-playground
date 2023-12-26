import { MsgObject } from "../types/dataTypes";
import { camelToSnake } from "../utils/helpers";

export const useReadSchema = (isQuery: boolean) => {
  const getInputs = (message: any, convertedString: string) => {
    let paramsArray: any[] = [];
    let optionalArray: any[] = [];
    let updatedMsg: MsgObject = {};
    // console.log(eval(message.type));

    //Extract the type string from the properties key
    let match = message?.type.match(
      /\{([^}]*)\}\s*:\s*\{([^}]*)\}[\s,]*?(?=,|\))/g
    );

    if (match) {
      console.log(match);
      const paramTypesArr: any[][] = [[], []];

      //Use regex to extract the param and their types
      let newObj: any = {};
      match.forEach((paramMatch: any, index: number) => {
        const [, paramNames, paramTypes] = paramMatch.match(
          /\{([^}]*)\}\s*:\s*\{([^}]*)\}/
        );
        console.log("part", paramMatch);

        const props = paramNames.trim().split(/,\s+/); //only params array
        const types = paramTypes.trim().split(/;\s+/); //params with their types
        console.log(props, types);

        props.forEach((prop: any, i: any) => {
          const propName = prop.trim();
          const propType = types[i].trim().replace(/\?$/, "");

          paramTypesArr[index]?.push({ name: propName, type: propType });
        });
      });
      console.log("all", paramTypesArr);

      //This if statement runs only when the hook is used for Execute messages
      if (!isQuery) {
        paramTypesArr[0]?.forEach((val) => {
          const isOptional = val.type.includes("?");
          const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
          if (val.name !== "account") {
            optionalArray.push({
              name: val.name,
              type: typeName,
              isOptional,
            });
          }
        });
        paramTypesArr[paramTypesArr.length - 1]?.forEach((val) => {
          const isOptional = val.type.includes("?");
          const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
          if (!isOptional) newObj[camelToSnake(val.name)] = "";

          paramsArray.push({
            name: val.name,
            type: typeName,
            isOptional,
          });
        });
      } else {
        paramTypesArr[0]?.forEach((val) => {
          const isOptional = val.type.includes("?");
          const typeName = val.type.split(":")[1].replace(/;$/, "").trim();
          if (!isOptional) newObj[camelToSnake(val.name)] = "";

          paramsArray.push({
            name: val.name,
            type: typeName,
            isOptional,
          });
        });
      }

      updatedMsg = {
        [convertedString]: newObj,
      };
    } else {
      updatedMsg = {
        [convertedString]: {},
      };
    }

    console.log(paramsArray);

    return { updatedMsg, paramsArray, optionalArray };
  };

  return { getInputs };
};
