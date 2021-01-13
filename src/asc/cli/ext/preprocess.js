// Write text (also fallback)

function outputCodeFile(abiInfo, hasOutput, opts, stats, baseDir, writeFile) {
  if (opts.sourceFile != null || !hasOutput) {
    let out;
    if (opts.sourceFile != null && opts.sourceFile.length) {
      // use superset text format when extension is `.wast`.
      // Otherwise use official stack IR format (wat).
      // let watFormat = !opts.textFile.endsWith('.ts');
      // stats.emitCount++;
      // stats.emitTime += measure(() => {
        out = abiInfo.exportIndent.toString();
        // out = module.toText(watFormat);
      // });
      writeFile(opts.sourceFile, out, baseDir);
    } else if (!hasStdout) {
      stats.emitCount++;
      stats.emitTime += measure(() => {
        out = module.toText();
      });
      writeStdout(out);
    }
  }
}

exports.outputCodeFile = outputCodeFile;

exports.sourceText = null;