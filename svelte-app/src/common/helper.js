/**
 *
 * @param {*} html
 * @param {*} options
 * @returns
 */
export const TemplateEngine = (html, options) => {
  let re = /{{(.+?)}}/g,
    reExp =
      /(^( )?(let|var|if|end|#if|#end|for|else|switch|case|break|{|}|;))(.*)?/g,
    code = "with(obj) { let r=[];\n",
    cursor = 0,
    result,
    match;
  let add = function (line, js) {
    if (js) {
      let matchArr1 = line.trim().split(" ");
      if (matchArr1.length > 1) {
        if (matchArr1[0] == "#if") {
          matchArr1[0] = "if(";
          matchArr1[1] = matchArr1[1] + "){";
          line = matchArr1.join("");
        }
      }

      if (matchArr1[0] == "#end") {
        matchArr1[0] = "}";
        line = "}";
      }
    }

    js
      ? (code += line.match(reExp) ? line + "\n" : "r.push(" + line + ");\n")
      : (code +=
          line != "" ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : "");
    return add;
  };
  while ((match = re.exec(html))) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, " ");
  try {
    result = new Function("obj", code).apply(options, [options]);
  } catch (err) {
    result = "An error occurred";
  }
  return result;
};

/**
 *
 * @param {*} yamlInput
 * @returns
 */
export const convertJsonObj = (yamlInput) => {
  let yamlInputArr = yamlInput.split(":");

  let parsedVal = "";
  if (yamlInputArr[1].trim() == "true" || yamlInputArr[1].trim() == "false") {
    parsedVal = yamlInputArr[1].trim() == "true";
  } else {
    parsedVal = '"' + yamlInputArr[1].trim() + '"';
  }
  return JSON.parse('{"' + yamlInputArr[0].trim() + '":' + parsedVal + "}");
};
