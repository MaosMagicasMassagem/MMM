function confirmarSessao() {
    const terapeuta = "Terapeuta 1";
    const servico = "Massagem 1";
    const data = "2024-05-10";
    const horario = "10:00";

    fetch('/confirmar-sessao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            terapeuta,
            servico,
            data,
            horario
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Sessão confirmada com sucesso!');
            // Aqui você pode redirecionar o usuário para uma página de confirmação
        } else {
            console.error('Falha ao confirmar a sessão.');
            // Aqui você pode exibir uma mensagem de erro para o usuário
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // Aqui você pode lidar com erros de rede ou outros erros
    });
}