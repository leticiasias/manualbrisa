<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar color="#0D47A1" elevation="0" border="bottom">
      <v-container class="d-flex align-center py-0">
        <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.push('/')"></v-btn>
        <v-icon icon="mdi-shield-account" color="white" class="mx-3"></v-icon>
        <v-toolbar-title class="text-white font-weight-bold text-subtitle-1 text-md-h6">
          Manual do Administrador
        </v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-sheet color="#0D47A1" class="py-10 px-4 text-white">
        <v-container>
          <h1 class="text-h4 font-weight-bold mb-3">Manual do Administrador</h1>
          <p class="text-blue-lighten-4 text-body-1" style="max-width: 800px;">
            Guia de configuração do sistema, gestão de parâmetros globais e controle de usuários do Brisa."
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
                      <div class="manual-content" v-html="formatText(item.conteudo)"></div>
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

// Textos configurados com marcações de títulos e listas sem alterar as palavras
const manualSections = [
  {
    titulo: '1. Acesso ao Sistema',
    icon: 'mdi-login',
    conteudo: `Para iniciar suas atividades, realize o **login seguro** na plataforma.

1. Acesse a **tela inicial** do sistema.
2. Insira seu **E-mail corporativo** cadastrado.
3. Digite sua **Senha**.
4. Clique no botão azul **ENTRAR**.

Ao entrar, você verá o **Painel Administrativo** com o menu lateral à esquerda para navegação.`
  },
  {
    titulo: '2. Cadastros Gerais',
    icon: 'mdi-cog-outline',
    conteudo: `Antes de iniciar os projetos, é necessário definir as categorias básicas que serão usadas pelos funcionários.

### **Tipos de Despesa**
Defina quais gastos são permitidos e seus limites de valor.

1. No menu lateral, clique em **Tipos de Despesa**.
2. No formulário **"Cadastrar Novo Tipo"**:
   - **Descrição**: Digite o nome da categoria (ex: Alimentação, Transporte, Hospedagem).
   - **Limite Diário (R$)**: Defina o valor máximo permitido por dia para essa despesa.
3. Clique em **ADICIONAR**.

O item aparecerá na lista **"Tipos Cadastrados"** logo abaixo, onde você também pode editar ou excluir itens existentes.

### **Tipos de Tarefa**
Padronize as atividades que os funcionários executarão.

1. No menu lateral, clique em **Tipos de Tarefa**.
2. No campo **"Descrição do tipo de tarefa"**, insira o nome da atividade (ex: Viagem Nacional, Compras Corporativas).
3. Clique em **ADICIONAR**.

Confira o registro na lista **"Tipos Cadastrados"**.`
  },
  {
    titulo: '3. Gestão de Projetos',
    icon: 'mdi-folder-account',
    conteudo: `Gerencie os centros de custo e defina quem será responsável por aprovar as despesas.

1. Acesse o menu **Projetos**.
2. Preencha o formulário de cadastro com os dados contratuais:
   - **Nome do Projeto** e **Sigla**.
   - **Agência Fomentadora** e **Número do Processo**.
   - **Data de Início** e **Data de Fim**.
   - **Total Orçado (R$)**: O orçamento total disponível.
   - **Descrição**: Detalhes adicionais sobre o projeto.
   - **Gestores Responsáveis**: Selecione os usuários (com perfil de Gerente) que farão a auditoria técnica das despesas deste projeto. **Nota:** Só aparecerão aqui usuários com perfil de Gerente.
3. Clique em **CADASTRAR**.

### **Como alterar um gestor de projeto:**
1. Na lista de projetos, clique no **lápis** ao lado do projeto desejado.
2. O formulário lá em cima será preenchido com os dados atuais.
3. No campo **Gestores Responsáveis**, adicione ou remova as pessoas.
4. Clique em **Salvar Alterações**.`
  },
  {
    titulo: '4. Gestão de Usuários',
    icon: 'mdi-account-multiple-plus',
    conteudo: `Controle quem tem acesso ao sistema e quais são suas permissões.

1. No menu lateral, vá até **Usuários**.
2. Preencha os dados do novo colaborador:
   - **Nome Completo**.
   - **E-mail**: Será utilizado como login.
   - **CPF**: Digite apenas os números.
   - **Perfil**: Selecione o nível de acesso (**Admin**, **Gerente**, **Funcionário** ou **Financeiro**).
   - **Senha**: Defina uma senha inicial.
   - **Dados Bancários**: Insira Banco, Agência e Conta (essencial para que o Financeiro realize os reembolsos).
3. Clique em **CADASTRAR**.

Na lista abaixo, utilize os ícones de ação para editar dados ou bloquear o acesso de usuários inativos.

### **Como inativar um usuário (Bloquear acesso):**
Se um colaborador saiu da empresa, não exclua o cadastro (para não perder o histórico de reembolsos). Apenas inative-o:

1. Na lista de usuários, localize a pessoa (use a barra de busca se precisar).
2. Na coluna de **Ações** (canto direito), clique no ícone vermelho **Bloquear**.
3. Confirme a ação na janela que abrir. O status mudará para **"Inativo"** e ele não conseguirá mais logar.`
  },
  {
    titulo: '5. Segurança e Monitoramento',
    icon: 'mdi-shield-sync',
    conteudo: `Ferramentas para auditar o uso do sistema e configurar a comunicação.

### **Logs de Auditoria**
Rastreie todas as ações importantes realizadas na plataforma.

1. Clique no menu **Logs do Sistema** (ícone de escudo).
2. Use os filtros de **Data Início** e **Data Fim** para delimitar o período.
3. Utilize o campo de busca para encontrar ações de um usuário específico.
4. A tabela exibirá a **Data/Hora**, a **Ação realizada** (ex: LOGIN_SUCCESS, CREATE), o **Usuário responsável** e os **Detalhes técnicos**.

### **Notificações**
Configure quais e-mails o sistema deve enviar automaticamente.

1. Acesse o menu **Notificações** (ícone de sino).
2. Você verá uma lista de eventos (ex: **"Funcionário submete prestação"**, **"Gerente aprova para o financeiro"**).
3. Utilize a **chave (switch)** ao lado de cada item para habilitar ou desabilitar aquele tipo de aviso por e-mail.

### **Como ligar ou desligar notificações automáticas:**
1. Vá em **Configurações de Notificação**.
2. Na aba **Configurar Envios**, você verá uma lista de situações (ex: **"Notificar aprovação"**).
3. Use o **interruptor (chave)** para ligar (**azul**) ou desligar (**cinza**) aquele tipo de e-mail.
4. Clique em **Salvar Alterações** no topo direito.

### **Como saber se um e-mail foi enviado:**
1. Na mesma tela, clique na aba **Histórico de Envios**.
2. Consulte a tabela:
   - Se o status for **SUCCESS (Verde)**: O e-mail saiu do sistema.
   - Se o status for **ERROR (Vermelho)**: Houve falha. Passe o mouse sobre o ícone de alerta para ler o motivo técnico.`
  }
]

// Função de formatação para renderizar o layout baseado nas marcações
const formatText = (text) => {
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-blue-darken-3 mt-4 mb-2">$1</h3>') // Títulos
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-darken-4 font-weight-bold">$1</strong>') // Negrito
    .replace(/^\• (.*$)/gim, '<div class="ml-4 mb-1"> <span class="text-blue">•</span> $1</div>') // Bullets
    .replace(/^\- (.*$)/gim, '<div class="ml-6 mb-1"> $1</div>') // Sub-bullets
    .replace(/\n/g, '<br>') // Quebras de linha
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