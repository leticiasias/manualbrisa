<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar color="#0D47A1" elevation="0" border="bottom">
      <v-container class="d-flex align-center py-0">
        <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.push('/')"></v-btn>
        <v-icon icon="mdi-account-tie" color="white" class="mx-3"></v-icon>
        <v-toolbar-title class="text-white font-weight-bold text-subtitle-1 text-md-h6">
          Manual do Gerente
        </v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-sheet color="#0D47A1" class="py-10 px-4 text-white">
        <v-container>
          <h1 class="text-h4 font-weight-bold mb-3">Manual do Gerente</h1>
          <p class="text-blue-lighten-4 text-body-1" style="max-width: 800px;">
            Orientações para a gestão de equipes, acompanhamento de tarefas e auditoria inicial de reembolsos.
          </p>
        </v-container>
      </v-sheet>
      <v-container class="mt-n1">
        <v-row justify="center">
<v-col cols="12" md="10" lg="10">
  <div v-for="(item, index) in manualSections" :key="index" class="mb-4">
    <v-card 
      elevation="2" 
      rounded="xl" 
      class="overflow-hidden card-transition"
      :class="{ 'active-card-border': activeIndex === index }"
    >
      <v-list-item 
        class="pa-5" 
        @click="toggle(index)"
        :append-icon="activeIndex === index ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
        <template v-slot:prepend>
          <v-avatar :color="activeIndex === index ? '#0D47A1' : 'blue-lighten-5'" size="52">
            <v-icon :color="activeIndex === index ? 'white' : '#0D47A1'">{{ item.icon }}</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-h6 font-weight-bold">
          {{ item.titulo }}
        </v-list-item-title>
      </v-list-item>

      <v-expand-transition>
        <div v-show="activeIndex === index">
          <v-divider></v-divider>
          <v-card-text class="bg-white pa-8 text-body-1 text-grey-darken-3">
            <div class="manual-content mb-6" v-html="formatText(item.conteudo)"></div>

<div v-if="item.videoUrl" class="mt-6">
  <v-responsive 
    :aspect-ratio="10/5" 
    width="80%"
class="mx-auto rounded-xl overflow-hidden bg-black"  >
    <div v-if="!item.playing" class="fill-height d-flex flex-column align-center justify-center">
      <v-btn
        icon="mdi-play"
        color="white"
        variant="elevated"
        size="x-large"
        class="mb-3"
        @click="item.playing = true"
      ></v-btn>
      <span class="text-white font-weight-bold">Reproduzir Vídeo</span>
    </div>

    <iframe
      v-else
      width="100%"
      height="100%"
      :src="`${item.videoUrl}?autoplay=1`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="border: 0; display: block;"
    ></iframe>
  </v-responsive>
</div>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</v-col>
          
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

// 1. Agora usando ref() para que o Vue observe as mudanças (como o clique no play)
const manualSections = ref([

    {
    titulo: '1. Acesso ao Sistema',
    icon: 'mdi-login',
    conteudo: `Para iniciar suas atividades, realize o **login seguro** na plataforma.

1. Acesse a **tela inicial** do sistema.
2. Insira seu **E-mail corporativo** cadastrado.
3. Digite sua **Senha**.
4. Clique no botão azul **ENTRAR**.

Ao entrar, você verá o **Painel de Gerente** com o menu lateral à esquerda para navegação.`
  },

  {
    titulo: '2. Criação e Distribuição de Tarefas',
    icon: 'mdi-clipboard-plus-outline',
    conteudo: `Antes que um funcionário possa lançar uma despesa, é necessário que o Gerente crie a tarefa e aloque os responsáveis.

• Acesse o menu **Gestão de Tarefas**.
• Clique no botão azul **CRIAR NOVA TAREFA** no canto superior direito.
### **Preencha o formulário de planejamento:**
• **Projeto**: Selecione a qual projeto esta atividade pertence.
• **Tipo de Tarefa**: Escolha a atividade (ex: Viagem, Consultoria).
• **Descrição**: Detalhes do que deve ser feito.
• **Funcionários**: Selecione um ou mais colaboradores que trabalharão nesta tarefa.
• **Período**: Defina a Data de Início e Fim.
• **Valor Orçado (R$)**: Quanto de verba está disponível para esta tarefa específica.
Clique em **SALVAR** para disponibilizar a tarefa aos funcionários.`
,
    videoUrl: 'https://www.youtube.com/embed/Oa9Pq_tW54s',
    playing: false 
  },
  {
    titulo: '3. Aprovação de Despesas',
    icon: 'mdi-check-decagram-outline',
    conteudo: `Sua rotina principal é verificar as prestações de contas enviadas.

### **Passo 1: Selecionar a Prestação**
• Acesse o menu **Aprovar Despesas**.
• Você verá uma lista com as prestações pendentes contendo: **Tarefa Associada e Funcionário**, **Data da Submissão e Valor Total**.
• Clique no botão **ANALISAR** ao lado da prestação desejada para abrir os detalhes e validar os recibos (aprovar ou glosar).

### **Passo 2: Analisar os Itens**
Na tela de detalhes, você verá o resumo financeiro no topo. Role para baixo para ver a tabela de itens (notas fiscais).
• **Verificar**: Leia a descrição e o valor.
• **Glosar (Cortar valor)**: Se um item for indevido ou caro demais:
  - No campo **"Valor a Glosar"**, digite quanto você quer descontar.
  - **Exemplo**: Se o almoço custou R$ 100,00 e o limite é R$ 80,00, digite 20,00 na glosa.
• **Justificativa**: É obrigatório escrever o motivo do corte no campo ao lado.

### **Passo 3: Decisão Final**
No final da página, escolha uma das ações:
• **Finalizar e Enviar ao Financeiro**: Use se estiver tudo certo (ou se você fez apenas glosas parciais). O funcionário será reembolsado pelo valor aprovado.
• **Rejeitar e Devolver**: Use se a prestação estiver muito errada (ex: faltam notas fiscais, fotos ilegíveis). Isso devolve tudo para o funcionário corrigir e enviar de novo. Você precisará escrever um motivo geral.`
,
    videoUrl: 'https://www.youtube.com/embed/E5RNeQnz3iU',
    playing: false 
  },
  {
    titulo: '4. Controle Orçamentário (Histórico)',
    icon: 'mdi-chart-line',
    conteudo: `Acompanhe o consumo da verba dos projetos em tempo real.

• Acesse o menu **Histórico de Tarefas**.
• Utilize os filtros no topo para buscar por **Projeto** ou **Status**.

### **Consulte a tabela comparativa financeira:**
• **Valor Orçado**: O que você planejou.
• **Valor Registrado**: O que o funcionário gastou.
• **Valor Glosado (Vermelho)**: O que foi recusado/cortado na auditoria.
• **Valor Aprovado (Verde)**: O valor final aceito.

Verifique a coluna **Status Geral** para saber se a tarefa está "Em Análise", "Concluída" ou "Aguardando Pagamento".`
,
    videoUrl: 'https://www.youtube.com/embed/7L78S5fHqcw',
    playing: false 
  }
])

const formatText = (text) => {
  if (!text) return ''
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-blue-darken-3 mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-darken-4 font-weight-bold">$1</strong>')
    .replace(/^\• (.*$)/gim, '<div class="ml-4 mb-1"> <span class="text-blue">•</span> $1</div>')
    .replace(/^\- (.*$)/gim, '<div class="ml-6 mb-1"> $1</div>')
    .replace(/\n/g, '<br>')
}

</script>

<style scoped>
.manual-content {
  line-height: 1.8;
  letter-spacing: 0.3px;
}
.card-transition {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.active-card-border {
  border: 2px solid #0D47A1 !important;
}
.v-list-item {
  user-select: none;
}
</style>