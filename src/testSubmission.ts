import { WebTester} from "./webTester";
import { program } from 'commander'
import * as path from "path";

program
    .requiredOption('-t, --test-file <testFile>', 'test file')
    .requiredOption('-f, --file <file>', 'submission file')
program.parse(process.argv)

const tester = new WebTester({targetFiles: ['index'], testsLocation: ''})

tester
    .testSubmission(path.resolve(program.file), false)
    .then((res) => {
        if (process.send) {
            process.send(res)
            return tester.finish()
        } else {
            console.log(JSON.stringify(res, null, '\t'))
            process.exit(0)
        }
    })
    .catch(_ => tester.finish())
