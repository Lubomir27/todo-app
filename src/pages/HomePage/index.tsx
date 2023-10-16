import PageWrapper from '../../components/layout/PageWrapper'
import ListTodos from './ListTodos'
import TodoListsHero from './TodoListsHero'

export default function HomePage() {
    return (
        <PageWrapper>
            <TodoListsHero />
            <ListTodos />
        </PageWrapper>
    )
}
