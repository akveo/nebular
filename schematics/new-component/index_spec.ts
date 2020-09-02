import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('new-component', () => {
  it('works', (done) => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    runner.runSchematicAsync('new-component', {}, Tree.empty())
      .subscribe((tree: UnitTestTree) => {
        expect(tree.files).toEqual([]);
        done();
      });
  });
});
