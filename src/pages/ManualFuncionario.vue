<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar color="#0D47A1" elevation="0" border="bottom">
      <v-container class="d-flex align-center py-0">
        <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.push('/')"></v-btn>
        <v-icon icon="mdi-book-open-variant" color="white" class="mx-3"></v-icon> 
        <v-toolbar-title class="text-white font-weight-bold text-subtitle-1 text-md-h6">
          Manual do Funcionário - Brisa
        </v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-sheet color="#0D47A1" class="py-10 px-4 text-white">
        <v-container>
          <h1 class="text-h4 font-weight-bold mb-3">Manual do Funcionário</h1> 
          <p class="text-blue-lighten-4 text-body-1" style="max-width: 800px;">
            Visualizar suas prestações de contas, registrar novas despesas e submetê-las para aprovação.
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

Ao entrar, você verá o **Painel de Funcionário** com o menu lateral à esquerda para navegação.`
  },
  {
    titulo: '2. Lançamento de Despesas',
    icon: 'mdi-plus-box',
    conteudo: `Para novos gastos, use o menu **"Registro de Despesas"** ou o botão **"Adicionar Nova Despesa"** dentro de uma prestação aberta..

### Passo 1: Selecionar a Tarefa
• No campo **"1. Tarefa"**, escolha a prestação vinculada.
        **Nota:** Apenas prestações com status "Em Andamento" ou "Pendente de Correção" aparecerão aqui.

### Passo 2: Adicionar Itens
Contém duas formas de preencher os dados:

• **Automática (OCR)**: Selecione a categoria, clique em **"Escanear Comprovante"** e anexe a foto. O sistema lerá CNPJ, data e valores.
• **Manual**: Preencha a Descrição, o Tipo de Despesa (ex: Alimentação, Transporte) e o Valor, depois clique em **"Adicionar Item"**.

### Passo 3: Justificativa de Limite
• Se o valor ultrapassar o teto da categoria, descreva obrigatoriamente o motivo do gasto excedente.

### Passo 4: Finalização
• Insira o CNPJ do estabelecimento, data da compra e anexe o arquivo (PDF ou Imagem) antes de **Salvar Despesa**.

**Edição de Itens**: Na tabela, use o ícone de **Lápis** para corrigir ou a **Lixeira** para excluir itens antes de enviar.`,
    videoUrl: 'https://www.youtube.com/embed/wvTPGxNMGn8',
    playing: false 
  },
  {
    titulo: '3. Submissão para Aprovação',
    icon: 'mdi-send-check',
    conteudo: `Após lançar todas as despesas, você deve enviar o relatório para conferência:

• Retorne à tela **"Minhas Prestações de Contas"** e selecione o item desejado.
• Confira se todos os valores estão corretos na tabela.
• Clique no botão verde: **"Fechar e Submeter para Aprovação"**.
• **Atenção**: Após a submissão, os dados são **bloqueados para edição**, exceto se o gestor devolver para correção.`

  },
    {
    titulo: '4. Visualizando Prestações de Contas',
    icon: 'mdi-eye',
    conteudo: `Acesse o menu lateral e clique em **"Minhas Prestações de Contas"**.

• **Seleção de Prestação**: Utilize o campo de seleção no topo da tela para escolher uma prestação específica.
• **Status**: O sistema exibirá se o item está **Em Andamento**, **Aguardando Aprovação** ou **Pendente de Correção**.
• **Detalhes e Histórico**: Ao selecionar, você verá os detalhes do projeto, a tarefa vinculada e o histórico de quem submeteu ou analisou o documento.
• **Resumo Financeiro**: No final da página, o sistema calcula o **Total Registrado** automaticamente com base nas despesas listadas.
**Pendente de Correção**: Se o gestor recusar algo, um alerta azul aparecerá com o **Motivo do Ajuste**.`
,
    videoUrl: 'https://www.youtube.com/embed/4uML6feDlq0',
    playing: false 
  },
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
