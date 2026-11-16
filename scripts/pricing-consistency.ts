import assert from 'node:assert/strict';
import { business } from '../src/config/business';
import { pricingPlans, truckOptions } from '../src/data/pricing';
for (const [index, crew] of [business.pricing.twoMovers, business.pricing.threeMovers].entries()) {
  assert.equal(crew.hourlyReference, crew.thirtyMinutes * 2);
  assert.equal(pricingPlans[index].ratePerHalfHour, crew.thirtyMinutes);
  assert.equal(pricingPlans[index].hourlyReference, crew.hourlyReference);
}
assert.deepEqual(truckOptions.map(truck => truck.id), ['small', 'big']);
assert.ok(truckOptions.every(truck => !('ratePerHalfHour' in truck)));
console.log('PASS: crew rates, hourly equivalents and independent quote-only truck preferences');
