<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar color="#0D47A1" elevation="0" border="bottom">
      <v-container class="d-flex align-center py-0">
        <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.push('/')"></v-btn>
        <v-icon icon="mdi-cash-register" color="white" class="mx-3"></v-icon> 
        <v-toolbar-title class="text-white font-weight-bold text-subtitle-1 text-md-h6">
          Manual do Financeiro - Brisa
        </v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-sheet color="#0D47A1" class="py-10 px-4 text-white">
        <v-container>
          <h1 class="text-h4 font-weight-bold mb-3">Manual do Financeiro</h1> 
          <p class="text-blue-lighten-4 text-body-1" style="max-width: 800px;">
            Conferência final de contas, execução de reembolsos e extração de dados para relatórios contábeis.
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


const manualSections = ref([
 
  {
    titulo: '1. Acesso ao Sistema',
    icon: 'mdi-login',
    conteudo: `Para iniciar suas atividades, realize o **login seguro** na plataforma.

1. Acesse a **tela inicial** do sistema.
2. Insira seu **E-mail corporativo** cadastrado.
3. Digite sua **Senha**.
4. Clique no botão azul **ENTRAR**.

Ao entrar, você verá o **Painel Financeiro** com o menu lateral à esquerda para navegação.`
  },
{
    titulo: '2. Validação de Prestações Pendentes',
    icon: 'mdi-clipboard-check-outline',
    conteudo: `O processo de pagamento inicia na tela de **Validação de Prestação de Contas**.

• **Localização de Pendências**: Utilize o seletor para visualizar as prestações com status **"Aguardando Pagamento"**.
• **Identificação**: O sistema exibe o ID da prestação, a descrição da tarefa e o nome do funcionário para facilitar a busca.
• **Início da Auditoria**: Ao selecionar uma conta, o painel de detalhes será carregado automaticamente abaixo do seletor.`
,
    videoUrl: 'https://www.youtube.com/embed/d5eBqHve26I',
    playing: false 
  },
  {
    titulo: '3. Auditoria de Itens e Comprovantes',
    icon: 'mdi-file-eye-outline',
    conteudo: `Antes de pagar, é essencial conferir a veracidade dos gastos e o histórico de aprovação.

• **Histórico de Ações**: Verifique quando o funcionário submeteu a despesa e qual gerente realizou a primeira aprovação.
• **Conferência de Itens**: Compare o **Valor Registrado** (pelo funcionário) com o **Valor Aprovado** (pelo gestor). Itens glosados (recusados) exibirão o motivo da recusa ao lado.
• **Visualização de Recibos**: Clique no botão **"Ver Comprovante"** em cada despesa para abrir o arquivo original (PDF ou Imagem) anexado pelo colaborador.`
  },
  {
    titulo: '4. Execução de Pagamento ou Devolução',
    icon: 'mdi-currency-usd',
    conteudo: `Após a auditoria, o financeiro deve decidir o destino da prestação.

### Marcar como Reembolsado
• Se os dados estiverem corretos, clique em **"Marcar como Reembolsado"**.
• O status da prestação mudará para **"Finalizada"**, registrando a data do pagamento e o seu nome como pagador.
### Devolver ao Gestor
• Se houver inconsistências que o gestor não percebeu, use o botão **"Devolver ao Gestor"**.
• **Motivo Obrigatório**: Você deve descrever detalhadamente por que a conta está sendo devolvida. O sistema enviará a prestação de volta para a fila de análise do gerente.`
  },
  {
    titulo: '5. Geração de Relatórios e Exportação',
    icon: 'mdi-file-chart-outline',
    conteudo: `O financeiro pode extrair dados consolidados para conciliação bancária.

• **Filtros Avançados**: É possível filtrar por **Data de Início/Fim**, **Projeto**, **Funcionário** ou **Status** específico (ex: Apenas Finalizadas).
• **Visualização Expandida**: Na tabela de resultados, utilize o ícone de expansão para visualizar os detalhes de cada item dentro da tarefa.
• **Exportação PDF**: Gera um relatório detalhado com cabeçalhos por tarefa e subtotais por prestação, ideal para auditorias externas.
• **Exportação CSV**: Exporta os dados em formato de planilha (separado por ponto e vírgula), facilitando a importação em sistemas de contabilidade ou Excel.`
,
    videoUrl: 'https://www.youtube.com/embed/d5eBqHve26I',
    playing: false 
  }
]
)

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