import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Clock } from "lucide-react";

const depoimentos = [
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício. O Kléby é excepcional.", objetivo: "Emagrecimento" },
  { nome: "Rafael M.", texto: "O acompanhamento faz toda a diferença. Nunca tive tanta consistência nos treinos.", objetivo: "Hipertrofia" },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados que eu nunca imaginei alcançar.", objetivo: "Condicionamento" },
  { nome: "Pedro L.", texto: "Profissional sério, método claro e evolução visível a cada mês.", objetivo: "Hipertrofia" },
  { nome: "Mariana R.", texto: "Voltei a treinar depois de anos parada. O acolhimento e a paciência foram essenciais.", objetivo: "Saúde" },
  { nome: "Lucas T.", texto: "Finalmente entendi o que é treinar com inteligência. Resultado sustentável.", objetivo: "Emagrecimento" },
];

const metricas = [
  { icon: Users, label: "Alunos acompanhados", valor: "+100" },
  { icon: Clock, label: "Meses de experiência", valor: "+60" },
];

const Resultados = () => {
  return (
    <>
      {/* Métricas */}
      <Section>
        <SectionTitle>Resultados</SectionTitle>
        <SectionSubtitle className="mb-12">
          Provas sociais de quem já treina com método e constância.
        </SectionSubtitle>
        <div className="flex flex-wrap gap-6 mb-16">
          {metricas.map((m, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-xl bg-muted/50 border border-border">
              <m.icon size={24} className="text-primary" />
              <div>
                <p className="font-heading font-bold text-2xl">{m.valor}</p>
                <p className="text-sm text-muted-foreground">{m.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Antes/Depois placeholder */}
        <h3 className="font-heading font-semibold text-xl mb-6">Transformações</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[3/4] rounded-xl bg-muted border border-border flex items-center justify-center">
              <div className="text-center">
                <User size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Antes / Depois {i}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Depoimentos */}
      <Section className="bg-muted/50">
        <h3 className="font-heading font-semibold text-xl mb-8">Depoimentos</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentos.map((d, i) => (
            <Card key={i} className="border-0 shadow-none bg-background">
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed mb-4 italic">"{d.texto}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-heading font-semibold text-sm text-primary">{d.nome}</p>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{d.objetivo}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Resultados;
