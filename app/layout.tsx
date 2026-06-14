import './globals.css';

export const metadata = {
    title: 'Quatro5 - Gestão de Atividades',
    description: 'Ferramenta de gestão para a equipe do Ricardo',
}

export default function LayoutRaiz({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
        <body>
            {children}
        </body>
        </html>
    )
}