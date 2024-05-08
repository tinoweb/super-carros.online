// CÓDIGO COPIA E COLA DO BOTÃO DE PIX
document.querySelector('.button[title="COPIAR CÓDIGO"]').addEventListener('click', function() {
    // Cria um elemento textarea temporário
    var textArea = document.createElement("textarea");
    
    // Define o valor do textarea para o conteúdo do span
    textArea.value = document.querySelector('#pixCode').textContent;
    
    // Adiciona o textarea ao DOM
    document.body.appendChild(textArea);
    
    // Seleciona o conteúdo do textarea
    textArea.select();
    
    // Copia o texto selecionado para a área de transferência
    document.execCommand('copy');
    
    // Remove o textarea do DOM
    document.body.removeChild(textArea);
    
    // (Opcional) Mostra uma mensagem para o usuário
    alert('Código copiado com sucesso!');
});

function copiarCodigoPixSuitPayNew(){
    // Cria um elemento textarea temporário
    var textArea = document.createElement("textarea");
    
    // Define o valor do textarea para o conteúdo do span
    textArea.value = document.querySelector('#pixCode').textContent;
    
    // Adiciona o textarea ao DOM
    document.body.appendChild(textArea);
    
    // Seleciona o conteúdo do textarea
    textArea.select();
    
    // Copia o texto selecionado para a área de transferência
    document.execCommand('copy');
    
    // Remove o textarea do DOM
    document.body.removeChild(textArea);
    
    // (Opcional) Mostra uma mensagem para o usuário
    alert('Código copiado com sucesso!');
}


// CONFIRMAR O PAGAMENTO
function confirmarPagamentoPIXSuitPay(codigo_referencia,order_id){

    jQuery("#btnConsultaOperacaoPix").html(`PROCESSANDO...`);

    const homeUrl = jQuery("#suitpay_homeurl").val();

    var params = "action=confirmar_pagamento_pix_suitpay&codigo_ref="+codigo_referencia+"&order_id="+order_id;

                        // ENVIAR PARA CONSULTA
                        jQuery.ajax({
                            url: homeUrl+"/wp-admin/admin-ajax.php",
                            type: "POST",
                            dataType: "json",
                            data: params,
                            success: function(data){

                                console.log("RETORNO SOBRE O PAGAMENTO:");
                                console.log(data);
                                
                                // A APOSTA DEU CERTO (O ENVIO)
                                if(data.sucesso==200){

                                    //console.log("RETORNO RECEBIDO COM SUCESSO!");

                                    // STATUS DO PAGAMENTO
                                    if(data.status_pagamento=="PAID"){

                                        var b = jQuery.confirm({
                                            title: 'Pagamento Confirmado',
                                            type: 'green',
                                            content: 'Seu pagamento foi confirmado com sucesso! Obrigado.',
                                            buttons: {
                                                heyThere: {
                                                    text: 'Ok', 
                                                    action: function () {
                                                        b.close();
                                                    }
                                                }
                                            }
                                        });

                                        jQuery("#btnConsultaOperacaoPix").html(`PAGAMENTO CONFIRMADO!`);
                                        jQuery("#btnConsultaOperacaoPix").attr("disabled", true);

                                        //return true;

                                    }else{

                                        var b = jQuery.confirm({
                                            title: 'Pagamento não identificado',
                                            type: 'red',
                                            content: 'Seu pagamento ainda não foi identificado. Confirme se já o realizou e tente novamente em alguns minutos.',
                                            buttons: {
                                                heyThere: {
                                                    text: 'Ok, entendi', 
                                                    action: function () {
                                                        b.close();
                                                    }
                                                }
                                            }
                                        });

                                        jQuery("#btnConsultaOperacaoPix").html(`CONFIRMAR O PAGAMENTO`);

                                        //return false;

                                    }
                                    
                                }

                            }
                        });


}