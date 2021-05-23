import { ImportStatement, NodeKind, Program, SourceKind } from "assemblyscript";

export class ProgramAnalyzar {
    private program: Program;

    constructor(program: Program) {
        this.program = program;
        this.print();
    }

    print(): void {
        // this.logFilesByName();
        // this.logElementsByDeclaration();
        // this.logSources();
    }

    logSources(): void {
        for (let index = 0; index < this.program.sources.length; index++) {
            let source = this.program.sources[index];
            console.log(
                `source: ${SourceKind[source.sourceKind]}, path: ${
                    source.internalPath
                }`
            );
        }
    }

    logFilesByName(): void {
        this.program.filesByName.forEach((file, key) => {
            if (key == "../patractlabs/ask/examples/preprocess/origin") {
                console.log(`key: ${key}, file namne: ${file}`);
                for (
                    let index = 0;
                    index < file.source.statements.length;
                    index++
                ) {
                    let statement = file.source.statements[index];
                    console.log(
                        `file Decalaration kind: ${NodeKind[statement.kind]}`
                    );
                    if (statement.kind == NodeKind.IMPORT) {
                        let importState = <ImportStatement>statement;
                        for (
                            let i = 0;
                            importState.declarations &&
                            i < importState.declarations.length;
                            i++
                        ) {
                            let nodeName = importState.declarations[
                                i
                            ].range.toString();
                            console.log(`nodeName: ${nodeName}`);
                        }
                    }
                }
            }
        });
    }

    logElementsByDeclaration(): void {
        this.program.elementsByDeclaration.forEach((_, key) => {
            if (
                key.kind == NodeKind.IMPORTDECLARATION ||
                key.kind == NodeKind.IMPORT
            ) {
                console.log(`Decalaration kind: ${NodeKind[key.kind]}`);
            }
        });
    }
}
