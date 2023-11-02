/* 
  deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\dice.js
*/

async function main() {
  // https://manual.deno.js.cn/getting_started/command_line_interface
  const FILE_FULL_NAME = Deno.cwd().concat('\\', Deno.args[0]);

  const DECODER = new TextDecoder("utf-8");
  const ORIGINAL_CONTENT = DECODER.decode(await Deno.readFile(FILE_FULL_NAME));
  Deno.writeTextFileSync(FILE_FULL_NAME, ORIGINAL_CONTENT.replace(/[\r\n]*export \{[ 0-9a-zA-Z\_]+\};/g, ''));
}

main();