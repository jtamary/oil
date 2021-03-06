import { forEach, hasRunningTimeout, oilWrapper, renderOil } from '../../../src/scripts/userview/userview_modal';
import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { resetOil } from '../../test-utils/utils_reset';

describe('the user view modal aka the oil layer wrapper', () => {

  beforeEach(() => resetOil());

  it('should have an functioning forEach replacement', () => {
    let array = [2, 1, 0];
    let result = [];
    forEach(array, function (value) {
      result.push(value)
    });
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(0);
  });

  it('should have the correct attributes', () => {
    expect(oilWrapper().outerHTML).toBe('<div class="as-oil light" data-qa="oil-Layer"></div>');
  });

  it('should have the given theme', () => {
    loadFixture('config/given.config.with.theme.html');
    expect(oilWrapper().outerHTML).toBe('<div class="as-oil dark" data-qa="oil-Layer"></div>');
  });

  it('should NOT renderOil with OPT-IN YES', () => {
    renderOil({optIn: true});

    expect(document.querySelector('.as-oil')).toBeNull();
    expectTimeoutNotStarted();
  });

  it('should NOT renderOil with OPT-IN FALSE and OPT-IGNORE: TRUE', () => {
    renderOil({optIn: true, optIgnore: true});

    expect(document.querySelector('.as-oil')).toBeNull();
    expectTimeoutNotStarted();
  });

  it('should renderOil with NO OPT-IN as DEFAULT TEMPLATE', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false});

    expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/soi.html'));
    expectTimeoutStarted();
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }

  function expectTimeoutStarted() {
    expect(hasRunningTimeout).toBeDefined();
  }
});
