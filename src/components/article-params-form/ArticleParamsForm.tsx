import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
  OptionType,
  ArticleStateType,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
} from 'src/constants/articleProps';
import { useEscapeAndOutsideClickClose } from './hooks/useEscapeAndOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
  currentState: ArticleStateType;
  applyState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
  currentState,
  applyState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(currentState);
  const formRef = useRef<HTMLElement>(null);

  // Сохраняем состояние формы между открытиями
  useEffect(() => {
    if (isOpen) {
      setFormState(currentState);
    }
  }, [isOpen, currentState]);

  useEscapeAndOutsideClickClose({
    isOpen,
    rootRef: formRef,
    onChange: setIsOpen,
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    applyState(formState);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFormState(defaultArticleState);
    applyState(defaultArticleState);
  };

  const handleFontFamilyChange = (selected: OptionType) => {
    setFormState({ ...formState, fontFamilyOption: selected });
  };

  const handleFontSizeChange = (selected: OptionType) => {
    setFormState({ ...formState, fontSizeOption: selected });
  };

  const handleFontColorChange = (selected: OptionType) => {
    setFormState({ ...formState, fontColor: selected });
  };

  const handleBgColorChange = (selected: OptionType) => {
    setFormState({ ...formState, backgroundColor: selected });
  };

  const handleContainerWidthChange = (selected: OptionType) => {
    setFormState({ ...formState, contentWidth: selected });
  };

  return (
    <>
      <ArrowButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      <aside 
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
        ref={formRef}
      >
        <form className={styles.form} onSubmit={handleApply}>
          <Text as='h2' size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleFontFamilyChange}
          />

          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFontSizeChange}
          />

          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFontColorChange}
          />

          <Separator />

          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleBgColorChange}
          />

          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleContainerWidthChange}
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              type="clear"
              onClick={handleReset}
            />
            <Button
              title="Применить"
              type="apply"
              htmlType="submit"
            />
          </div>
        </form>
      </aside>
    </>
  );
};