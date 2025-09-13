import { useState, CSSProperties } from 'react';
import {
  ArticleStateType,
  defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article';
import styles from './App.module.scss';

export const App = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

  return (
    <main
      className={styles.main}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm 
        currentState={articleState} 
        applyState={setArticleState} 
      />
      <Article />
    </main>
  );
};