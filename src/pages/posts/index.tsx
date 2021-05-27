import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return(
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>27 de Maio</time>
            <strong>Title 1</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad dicta vel odio est veritatis laboriosam optio quo doloremque quod porro aliquid, reiciendis error, sed necessitatibus expedita debitis ullam obcaecati.</p>
          </a>
          <a href="#">
            <time>25 de Maio</time>
            <strong>Title 2</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat molestiae veritatis architecto nulla unde, non harum, error exercitationem, rerum voluptate ipsam officia iste! Molestias dolor magnam esse, ut modi sunt.</p>
          </a>
          <a href="#">
            <time>22 de Maio</time>
            <strong>Title 3</strong>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quia aperiam harum impedit laudantium molestias tempore, magni nisi, placeat laborum doloremque numquam, quasi recusandae. Neque id porro quod ullam maiores?</p>
          </a>
        </div>
      </main>
    </>
  )
}