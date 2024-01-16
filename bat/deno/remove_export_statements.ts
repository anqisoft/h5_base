/* 
  deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\h5_base.js
  deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\report.js
  deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\report_wrapper.js
*/

async function main() {
  // https://manual.deno.js.cn/getting_started/command_line_interface
  // const FILE_FULL_NAME = Deno.cwd().concat('\\', Deno.args[0]);
  const FIRST_PARAMETER = Deno.args[0];
  const FILE_FULL_NAME = (FIRST_PARAMETER.startsWith('/') || FIRST_PARAMETER.indexOf(':') > -1) ? FIRST_PARAMETER : Deno.cwd().concat('\\', FIRST_PARAMETER);

  const DECODER = new TextDecoder("utf-8");
  const ORIGINAL_CONTENT = DECODER.decode(await Deno.readFile(FILE_FULL_NAME));
  Deno.writeTextFileSync(FILE_FULL_NAME, ORIGINAL_CONTENT.replace(/[\r\n]*export \{[ 0-9a-zA-Z\_\$]+\};/g, ''));
}

main();