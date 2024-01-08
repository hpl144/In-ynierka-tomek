//wymiennik
const H = 0.3;
const L = 0.5;
const Lpk = 5;
const rowPitch = 0.025;

//rura
const outerDiamater = 0.012;
const wallThickness = 0.0003;
//żebra
const finThickness = 0.0002;
// powietrze
const Ta = 20;
const Wa = 700;

//woda
const Tw = 40;
const Ww = 0.3;

//stałe
const x1 = 0.8033;
const x2 = 0.3619;
const Pr = 4.31;
const vw = 0.659;

const Re = (Ww * (outerDiamater - 2 * wallThickness)) / vw;

const Nu = x1 * Math.pow(Re, x2) * Math.pow(Pr, 1 / 3);

const lambda = 63.5;

const alfa = Nu / lambda;
//0.00307, 0.21915082
const d = (Nu * lambda) / alfa;
//d = 4028,326

const Abf = L * outerDiamater * Math.PI - outerDiamater * Math.PI * finThickness;
console.log("Abf", Abf);

const Af = H * 2 + L * 2 + finThickness * 2 - outerDiamater * Math.PI * finThickness;
console.log("Af", Af);

const Ao = L * outerDiamater * Math.PI;
console.log("Ao", Ao);

const e = 2.718;
const nf = -1 * Math.pow(e, -8) * Math.pow(alfa, 3) + Math.pow(e, -5) * Math.pow(alfa, 2) - 0.004 * alfa + 0.9939;
console.log("nf", nf);

const alfaEq = alfa * (Abf / Ao + (Af / Ao) * nf);
console.log("alfaEq", alfaEq);

const Ain = L * (outerDiamater - 2 * wallThickness) * Math.PI;
console.log("Ain", Ain);

const deltaT = wallThickness;
const lambdaT = 370;

const Uoi = Math.pow(1 / alfaEq + (Ao / Ain) * (deltaT / lambdaT) + (Ao / Ain) * (1 / alfa), -1);
console.log("Uoi", Uoi);

const cpw = 4.174;
const cpa = 1.005;

const din = outerDiamater - 2 * wallThickness;
console.log("din", din);

const mw = Math.PI * (Math.pow(din, 2) / 4) * Ww;
console.log("mw", mw);

const xi = L / Lpk;

const deltaAoi = Math.PI * outerDiamater * xi;
console.log("deltaAo", deltaAoi);

const Nwi = (Uoi * deltaAoi) / (mw * cpw);
console.log("Nwi", Nwi);

const Mai = rowPitch * L * Wa;
console.log("Mai", Mai);

const deltaMai = rowPitch * xi * Wa;
console.log("deltaMai", deltaMai);

const Nai = (Uoi * deltaAoi) / (deltaMai * cpa);
console.log("Nai", Nai);

const Tw_1 = Ta + (Tw - Ta) * Math.exp((-Nwi / Nai) * (1 - Math.exp(-Nai)));
console.log("Tw_1", Tw_1);

const Ta_1 = Ta + (Tw - Ta) * (Nai / Nwi) * (1 - Math.exp((-Nwi / Nai) * (1 - Math.exp(-Nai))));
console.log("Ta_1", Ta_1);
