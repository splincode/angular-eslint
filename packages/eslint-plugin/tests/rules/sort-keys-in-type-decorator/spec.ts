import { RuleTester } from '@angular-eslint/test-utils';
import rule, {
  RULE_NAME,
} from '../../../src/rules/sort-keys-in-type-decorator';
import { invalid, valid } from './cases';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...valid,
    {
      code: `
        @Component({
          selector: 'app-root',
          custom: true
        })
        class Test {}
      `,
      options: [
        {
          Component: ['selector'],
          allowUnconfiguredProperties: true,
        },
      ],
    },
    {
      code: `
        @Component({
          selector: 'app-root',
          template: '<div></div>'
        })
        class Test {}
      `,
      options: [
        {
          Component: ['selector', 'template'],
          allowUnconfiguredProperties: false,
        },
      ],
    },
    {
      code: `
        @Component({
          moduleId: 'test-module',
          standalone: true,
          selector: 'app-root',
          imports: [CommonModule],
          template: '<div></div>',
          styleUrl: './app.component.css',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          providers: [TestService],
          host: {'[class.test]': 'true'}
        })
        class TestComponent {}

        @Directive({
          standalone: true,
          selector: '[appTest]',
          inputs: ['value'],
          outputs: ['change'],
          providers: [TestService],
          host: {'[class.test]': 'true'}
        })
        class TestDirective {}

        @Injectable({
          providedIn: 'root'
        })
        class TestService {}

        @NgModule({
          id: 'test-module',
          imports: [CommonModule],
          declarations: [TestComponent],
          providers: [TestService],
          exports: [TestComponent],
          bootstrap: [AppComponent],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        class TestModule {}

        @Pipe({
          standalone: true,
          name: 'testPipe',
          pure: true
        })
        class TestPipe {}
      `,
      options: [
        {
          Component: [
            'moduleId',
            'standalone',
            'signal',
            'selector',
            'imports',
            'template',
            'templateUrl',
            'styleUrl',
            'styleUrls',
            'styles',
            'encapsulation',
            'changeDetection',
            'providers',
            'viewProviders',
            'animations',
            'entryComponents',
            'preserveWhitespaces',
            'interpolation',
            'hostDirectives',
            'host',
          ],
          Directive: [
            'standalone',
            'selector',
            'inputs',
            'outputs',
            'providers',
            'exportAs',
            'queries',
            'hostDirectives',
            'host',
            'jit',
          ],
          Injectable: ['providedIn'],
          NgModule: [
            'id',
            'jit',
            'imports',
            'declarations',
            'providers',
            'exports',
            'entryComponents',
            'bootstrap',
            'schemas',
          ],
          Pipe: ['standalone', 'name', 'pure'],
          allowUnconfiguredProperties: false,
        },
      ],
    },
  ],
  invalid: [
    ...invalid,
    {
      code: `
        @Component({
          custom: true
        })
        class Test {}
      `,
      options: [
        {
          Component: ['selector'],
          allowUnconfiguredProperties: false,
        },
      ],
      errors: [
        {
          messageId: 'unconfiguredProperty',
          data: {
            decorator: 'Component',
            property: 'custom',
          },
        },
      ],
    },
  ],
});
