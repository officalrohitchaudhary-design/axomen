export type SessionV1Step =
  | "splash"
  | "service"
  | "problem"
  | "dont-worry"
  | "understand-impact"
  | "question"
  | "not-alone"
  | "inner-drive"
  | "email"
  | "name"
  | "plan-ready"
  | "pay-what-you-want"
  | "success";

export type ServiceType = "individual" | "teen" | "couples";

export type ProblemType = "porn" | "masturbation" | "both";

export interface SessionV1State {
  step: SessionV1Step;
  serviceType: ServiceType | null;
  problemType: ProblemType | null;
  questionIndex: number;
  answers: Record<string, string>;
  email: string;
  name: string;
  selectedPriceTier?: string;
}
