import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "请输入姓名"),
  email: z.string().email("请输入有效的邮箱地址"),
  company: z.string().min(1, "请输入公司名称"),
  budget: z.string().min(1, "请选择预算范围"),
  message: z.string().min(10, "请至少输入 10 个字符的描述"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const budgetOptions = [
  { value: "under-10k", label: "Under ¥10,000" },
  { value: "10k-50k", label: "¥10,000 – ¥50,000" },
  { value: "50k-100k", label: "¥50,000 – ¥100,000" },
  { value: "100k-plus", label: "¥100,000+" },
  { value: "not-sure", label: "Not sure yet" },
];
