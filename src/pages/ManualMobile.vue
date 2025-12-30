<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar color="#0D47A1" elevation="0" border="bottom">
      <v-container class="d-flex align-center py-0">
        <v-icon icon="mdi-cellphone-check" color="white" class="mx-3"></v-icon>
        <v-toolbar-title class="text-white font-weight-bold text-subtitle-1">
          Manual Versão Mobile
        </v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-sheet color="#0D47A1" class="py-10 text-white text-center">
        <v-container>
          <h1 class="text-h4 font-weight-bold mb-2">Guia do Aplicativo</h1>
          <p class="text-blue-lighten-4">Siga o passo a passo para utilizar o Brisa no seu celular.</p>
        </v-container>
      </v-sheet>

      <v-container class="mt-n8">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            
            <v-card 
              v-for="(passo, index) in passos" 
              :key="index" 
              class="mb-6 overflow-hidden rounded-xl" 
              elevation="3"
            >
              <v-row no-gutters>
                <v-col cols="12" sm="4" class="bg-grey-lighten-3 d-flex align-center justify-center pa-4">
                  <v-img
                    :src="passo.imagem"
                    max-height="400"
                    width="100%"
                    class="rounded-lg elevation-2 border"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="#0D47A1"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>

                <v-col cols="12" sm="8" class="pa-6 d-flex flex-column justify-center text-left">
                  <div class="d-flex align-center mb-3">
                    <v-chip color="#0D47A1" variant="flat" size="small" class="mr-3 font-weight-bold">
                      PASSO {{ index + 1 }}
                    </v-chip>
                  </div>
                  <h3 class="text-h5 font-weight-bold mb-3" style="color: #0D47A1">
                    {{ passo.titulo }}
                  </h3>
                  <p class="text-body-1 text-grey-darken-3 descricao-texto" v-html="passo.texto"></p>
                </v-col>
              </v-row>
            </v-card>

<v-card class="mt-12 mb-12 pa-8 text-center bg-grey-darken-4 text-white rounded-xl elevation-6">
  <h2 class="text-h5 font-weight-bold mb-6">Assista ao Tutorial Completo</h2>
  
  <v-responsive 
    max-width="280" 
    class="mx-auto rounded-xl overflow-hidden bg-black elevation-10"
    style="border: 8px solid #444 !important;" 
  >
    <v-responsive :aspect-ratio="9/16">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/n4omKEJq7mI" 
        title="Tutorial Mobile Brisa"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style="border: 0; display: block;"
      ></iframe>
    </v-responsive>
  </v-responsive>

  <p class="mt-6 text-caption text-grey-lighten-1">
    Confira o passo a passo detalhado no vídeo acima.
  </p>
</v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-footer class="bg-grey-lighten-3 py-8 mt-12">
        <v-container class="text-center text-grey">
          © 2025 Brisa - Sistema de Reembolso
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

// IMPORTAÇÃO DAS IMAGENS
import imgM1 from '@/assets/m1.jpg'; 
import imgM2 from '@/assets/m2.jpg'; 
import imgM3 from '@/assets/m3.jpg'; 
import imgM4 from '@/assets/m4.jpg'; 
import imgM5 from '@/assets/m5.jpg'; 
import imgM6 from '@/assets/m6.jpg'; 
import imgM7 from '@/assets/m7.jpg'; 
import imgM9 from '@/assets/m9.jpg'; 

const passos = ref([
     {
    titulo: 'Acessando o App',
    imagem: imgM1,
    texto: 'A tela inicial do aplicativo permite que o funcionário acesse sua conta rapidamente. O login é simples e direto: basta inserir o e-mail e a senha que já são gerados automaticamente pelo sistema no momento do cadastro.'
  },

  {
    titulo: 'Leitura do QR Code',
    imagem: imgM2,
    texto: 'Assim que o login é realizado, o aplicativo abre automaticamente a câmera para leitura do QR Code da nota fiscal. Essa leitura agiliza o lançamento das despesas, preenchendo automaticamente os dados principais da nota. <br><br> <b>Importante:</b> Tire uma foto nítida do seu comprovante fiscal. Essa imagem será armazenada junto ao lançamento para conferência do gestor e do financeiro.'
  },
  {
    titulo: 'Lançamento de Despesas',
    imagem: imgM3,
    texto: 'Após a leitura do QR Code, o usuário é direcionado para a tela de lançamento da despesa. Aqui, ele visualiza o tipo de tarefa atribuída, a categoria, os dados capturados e um campo para observações. Caso haja mais de um item, também é possível adicionar novos produtos antes de salvar.<br><br><b>Adicionando Itens:</b> Caso precise detalhar os produtos, utilize o pop-up de inserção. Você pode colocar descrição, tipo de despesa e o valor exato de cada item do comprovante.<br><br><b>Sucesso:</b> Depois de salvar, o aplicativo exibe uma notificação interna confirmando que a despesa foi registrada com sucesso, garantindo segurança e transparência.'
  },
{
  titulo: 'Prestações e Itens Lançados',
  imagem: imgM4,
  texto: 'Na aba <b>Prestações</b>, você acessa seus eventos e tarefas. Ao selecionar um item, o sistema exibe a lista completa de despesas registradas e o <b>total acumulado</b>, garantindo um controle claro das suas contas.'
  },
  {
    titulo: 'Detalhes das Despesas',
    imagem: imgM6,
    texto: 'Ao selecionar uma despesa, o usuário vê todos os detalhes: itens, valores, categoria e informações da nota. Uma tela pensada para facilitar consultas e revisões.'
  },
  {
    titulo: 'Lançamento Manual',
    imagem: imgM7,
    texto: 'O app também permite lançar despesas manualmente sem o QR Code. O funcionário preenche as informações necessárias, inclui observações e finaliza tocando em Lançar.'
  },
  {
    titulo: 'Envio para o Gerente',
    imagem: imgM9,
    texto: 'Ao finalizar a tarefa, o usuário submete a prestação. O sistema exibe uma confirmação de que os dados foram enviados ao gerente para análise e aprovação do reembolso.'
  }
]);
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out;
}
.v-card:hover {
  transform: translateY(-4px);
}
.border {
  border: 1px solid #e0e0e0 !important;
}

/* REGRA PARA O NEGRITO FICAR AZUL */
.descricao-texto :deep(b), 
.descricao-texto :deep(strong) {
  color: #0D47A1;
  font-weight: bold;
}
</style>