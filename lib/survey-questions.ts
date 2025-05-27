interface SurveyOption {
  value: string
  label: string
}

interface SurveyQuestion {
  id: string
  title: string
  type: "radio" | "checkbox" | "number" | "scale"
  options?: SurveyOption[]
  hasCustomInput?: boolean
  customInputTrigger?: string
  customInputPlaceholder?: string
  placeholder?: string
  suffix?: string
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
}

// Define all questions in an array for easy mapping
const questions = [
  {
    id: "first_q",
    title: "Care este principalul tău obiectiv de sănătate în acest moment?",
    type: "radio",
    options: [
      { value: "Să slăbesc", label: "Să slăbesc" },
      { value: "Să mă mențin în formă", label: "Să mă mențin în formă" },
      { value: "Să iau în greutate sănătos", label: "Să iau în greutate sănătos" },
      { value: "Să am mai multă energie", label: "Să am mai multă energie" },
      { value: "Altceva", label: "Altceva" },
    ],
    hasCustomInput: true,
    customInputTrigger: "Altceva",
    customInputPlaceholder: "Specifică obiectivul tău",
  },
  {
    id: "second_q",
    title: "Cât de repede ți-ai dori să vezi rezultate?",
    type: "radio",
    options: [
      { value: "În 1-2 săptămâni", label: "În 1-2 săptămâni" },
      { value: "În 1 lună", label: "În 1 lună" },
      { value: "Nu mă grăbesc, vreau rezultate sustenabile", label: "Nu mă grăbesc, vreau rezultate sustenabile" },
    ],
  },
  {
    id: "third_q",
    title: "Ce obiceiuri alimentare ai în prezent?",
    type: "radio",
    options: [
      { value: "Mănânc regulat 3 mese pe zi", label: "Mănânc regulat 3 mese pe zi" },
      { value: "Sar uneori peste mese", label: "Sar uneori peste mese" },
      { value: "Consum mult fast-food/gustări nesănătoase", label: "Consum mult fast-food/gustări nesănătoase" },
      { value: "Am o alimentație echilibrată", label: "Am o alimentație echilibrată" },
    ],
  },
  {
    id: "four_q",
    title: "Obișnuiești să faci mișcare?",
    type: "radio",
    options: [
      { value: "Da, zilnic", label: "Da, zilnic" },
      { value: "Da, de câteva ori pe săptămână", label: "Da, de câteva ori pe săptămână" },
      { value: "Rar", label: "Rar" },
      { value: "Deloc", label: "Deloc" },
    ],
  },
  {
    id: "five_q",
    title: "Câte kilograme ți-ai dori să slăbești sau să câștigi?",
    type: "number",
    placeholder: "Număr de kilograme",
    suffix: "kg",
  },
  {
    id: "six_q",
    title: "Ce tip de produse ai mai folosit până acum pentru a-ți atinge obiectivele?",
    type: "checkbox",
    options: [
      { value: "Niciunul", label: "Niciunul" },
      { value: "Suplimente (ex: proteine, vitamine)", label: "Suplimente (ex: proteine, vitamine)" },
      { value: "Alte programe de slăbit (ex: diete, detox)", label: "Alte programe de slăbit (ex: diete, detox)" },
      { value: "Produse Herbalife", label: "Produse Herbalife" },
      { value: "Altceva", label: "Altceva" },
    ],
    hasCustomInput: true,
    customInputTrigger: "Altceva",
    customInputPlaceholder: "Specifică produsele folosite",
  },
  {
    id: "seven_q",
    title: "Ai vreo restricție alimentară sau intoleranță?",
    type: "checkbox",
    options: [
      { value: "Lactoză", label: "Lactoză" },
      { value: "Gluten", label: "Gluten" },
      { value: "Veggie/Vegan", label: "Veggie/Vegan" },
      { value: "Nu am", label: "Nu am" },
      { value: "Altceva", label: "Altceva" },
    ],
    hasCustomInput: true,
    customInputTrigger: "Altceva",
    customInputPlaceholder: "Specifică restricțiile alimentare",
  },
  {
    id: "eight_q",
    title: "Care este motivul principal pentru care vrei o schimbare acum?",
    type: "radio",
    options: [
      { value: "Sănătate", label: "Sănătate" },
      { value: "Aspect fizic", label: "Aspect fizic" },
      { value: "Încredere în sine", label: "Încredere în sine" },
      { value: "Energie și vitalitate", label: "Energie și vitalitate" },
      { value: "Recomandare medicală", label: "Recomandare medicală" },
      { value: "Alt motiv", label: "Alt motiv" },
    ],
    hasCustomInput: true,
    customInputTrigger: "Alt motiv",
    customInputPlaceholder: "Specifică motivul",
  },
  {
    id: "nine_q",
    title: "Pe o scară de la 1 la 5, cât de motivat(ă) ești să începi un program de transformare?",
    type: "scale",
    min: 1,
    max: 5,
    minLabel: "Deloc motivat",
    maxLabel: "Foarte motivat",
  },
  {
    id: "ten_q",
    title: "Cum preferi să fii contactat pentru recomandări personalizate?",
    type: "radio",
    options: [
      { value: "Telefon", label: "Telefon" },
      { value: "WhatsApp", label: "WhatsApp" },
      { value: "Email", label: "Email" },
      { value: "Facebook/Instagram", label: "Facebook/Instagram" },
      { value: "Altceva", label: "Altceva" },
    ],
    hasCustomInput: true,
    customInputTrigger: "Altceva",
    customInputPlaceholder: "Specifică metoda de contact",
  },
] as const satisfies SurveyQuestion[]


export default questions
export type { SurveyQuestion, SurveyOption }