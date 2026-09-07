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
          strict: false,
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
          strict: true,
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
          strict: true,
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
