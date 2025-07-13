'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useVisibleErrorImages } from './useVisibleErrorImages';

const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];


const SurveyForm = () => {
    const [focused1, setFocused1] = useState(false);
    const [focused12, setFocused12] = useState(false);
    const [focused15, setFocused15] = useState(false);
    const [focused16, setFocused16] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [errorFields, setErrorFields] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [hasForcedOnce, setHasForcedOnce] = useState(false);
    const [thankYouDialogOpen, setThankYouDialogOpen] = useState(false);
    const { refs, visible } = useVisibleErrorImages(errorFields);


    const topRef = useRef<HTMLDivElement | null>(null);

    const [answers, setAnswers] = useState<Answers>({
        q1: '',          // 年齢（number）
        q2: '',          // 性別（radio）
        q3: '',          // 都道府県（select）
        q4: '',          // 普段使う言語（radio）
        q5: [],          // 利用しているデバイス（checkbox 複数）
        q6: '',          // インターネット利用時間（radio）
        q7: [],          // よく利用するサービス（checkbox）
        q8: '',          // 買い物場所（radio）
        q9: '',          // 通勤・通学手段（radio）
        q10: '',         // 食事スタイル（radio）
        q11: '',         // よく見るテレビ・動画（radio）
        q12: '',         // 行ってみたい場所（textarea）
        q13: [],         // 音楽ジャンル（checkbox）
        q14: '',         // 雨の日の過ごし方（radio）
        q15: '',         // よく使うアプリ（textarea）
        q16: '',         // 最近うれしかったこと（textarea）
        q17: '',         // 困ったときの相談相手（radio）
        q18: '',         // ストレス対処法（radio）
        q19: '',         // リラックス方法（radio）
        q20: '',         // アンケートの答えやすさ（radio）
    });

    const q2Options = ['男性', '女性', 'その他', '答えたくない'];
    const q4Options = ['日本語', '英語', 'その他'];
    const q5Options = ['スマートフォン', 'パソコン', 'タブレット', 'その他'];
    const q6Options = ['1時間未満', '1〜2時間', '2〜3時間', '3〜4時間', '4〜5時間', '5時間以上'];
    const q7Options = ['メール', 'SNS', '動画', 'ニュース', '買い物'];
    const q8Options = ['スーパー', 'コンビニ', 'ネット通販', 'その他'];
    const q9Options = ['徒歩', '自転車', '電車・バス', '自動車'];
    const q10Options = ['自炊', '外食', '家族と', '不規則'];
    const q11Options = ['ニュース', 'ドラマ', 'バラエティ', 'アニメ', '見ない'];
    const q13Options = ['J-POP', '洋楽', 'ロック', 'クラシック', 'ジャズ', 'アニメソング', 'その他'];
    const q14Options = ['家で過ごす', '外出する', '特に決めていない'];
    const q17Options = ['家族', '友人', 'ネット', '誰にも相談しない'];
    const q18Options = ['寝る', '話す', '食べる', '気にしない'];
    const q19Options = ['音楽', 'お風呂', '散歩', '寝る'];
    const q20Options = ['はい', 'どちらともいえない', 'いいえ'];


    const validateForm = (): boolean => {
        let newErrors: string[] = [];
        let newErrorFields: string[] = [];

        const requiredFields: (keyof Answers)[] = [
            'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10',
            'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20'
        ];

        // 強制エラー対象
        const forcedErrorFields: (keyof Answers)[] = ['q1', 'q12', 'q20'];

        // 通常バリデーション
        for (const key of requiredFields) {
            const val = answers[key];
            const isEmpty = Array.isArray(val) ? val.length === 0 : !val?.toString().trim();

            if (isEmpty) {
                newErrors.push(`${key.replace('q', '')}. 入力または選択が必要です`);
                newErrorFields.push(key);
            }
        }

        // エラーが3件未満なら強制エラーを追加
        if (!hasForcedOnce && newErrorFields.length < 3) {
            const needed = 3 - newErrorFields.length;
            const remainingForced = forcedErrorFields.filter(f => !newErrorFields.includes(f));
            const toForce = remainingForced.slice(0, needed);

            toForce.forEach((key) => {
                newErrors.push(`${key.replace('q', '')}. 実験上の強制エラーです`);
                newErrorFields.push(key);
            });
            setAnswers(prev => {
                const updated = { ...prev };
                toForce.forEach(k => {
                    if (Array.isArray(prev[k])) {
                        updated[k] = [] as any;
                    } else {
                        updated[k] = '' as any;
                    }
                });
                return updated;
            });
        }
        if (newErrorFields.length > 0) {
            setErrors(newErrors);
            setErrorFields(newErrorFields);
            return false;
        }
        return true;
    };


    const handleCheckboxChange = (questionKey: keyof typeof answers, option: string) => {
        setAnswers((prev) => {
            const currentArray = prev[questionKey] as string[];
            const newArray = currentArray.includes(option)
                ? currentArray.filter((item) => item !== option)
                : [...currentArray, option];

            return {
                ...prev,
                [questionKey]: newArray,
            };
        });

        setErrorFields((prevErrors) => {
            const updatedArray = answers[questionKey] as string[];
            const isChecked = updatedArray.includes(option)
                ? updatedArray.length > 1
                : updatedArray.length >= 0;

            if (isChecked) {
                return prevErrors.filter((f) => f !== questionKey);
            }
            return prevErrors;
        });

    };

    const handleCheckClick = () => {
        if (!validateForm()) {
            setOpenDialog(true);
        } else {
            setSubmitted(true);
            setErrorFields([]);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setHasForcedOnce(true);
        setTimeout(() => {
            scrollToTop();
        }, 0);
    };

    return (
        <Box width="100%">
            <Card>
                <CardContent>
                    {!submitted ? (
                        <FormGroup ref={topRef}>
                            <FormControl margin="normal" error={errorFields.includes('q1')} ref={refs.q1}>
                                <FormLabel
                                    sx={{
                                        color: focused1 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    1. 年齢</FormLabel>
                                <Collapse in={!openDialog && visible.q1} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/typing.jpg"
                                            alt="入力エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    fullWidth
                                    value={answers.q1}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q1: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q1'));
                                    }}
                                    onFocus={() => setFocused1(true)}
                                    onBlur={() => setFocused1(false)}
                                    error={errorFields.includes('q1')}
                                />

                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q2')} ref={refs.q2}>
                                <FormLabel >2. 性別</FormLabel>
                                <Collapse in={!openDialog && visible.q2} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup
                                    row
                                    value={answers.q2}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q2: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q2'));
                                    }}
                                >
                                    {q2Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal" error={errorFields.includes('q3')} ref={refs.q3}>
                                <FormLabel>3. お住まいの地域（都道府県）</FormLabel>
                                <Collapse in={!openDialog && visible.q3} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <Select
                                    value={answers.q3}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q3: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q3'));
                                    }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>選択してください</em>
                                    </MenuItem>
                                    {prefectures.map((pref) => (
                                        <MenuItem key={pref} value={pref}>{pref}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl margin="normal" error={errorFields.includes('q4')} ref={refs.q4}>
                                <FormLabel>4. 普段使う言語を教えてください</FormLabel>
                                <Collapse in={!openDialog && visible.q4} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q4}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q4: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q4'));
                                    }}
                                >
                                    {q4Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q5')} ref={refs.q5}>
                                <FormLabel>5. 利用しているデバイス</FormLabel>
                                <Collapse in={!openDialog && visible.q5} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <FormGroup row>
                                    {q5Options.map((opt) => (
                                        <FormControlLabel
                                            key={opt}
                                            control={
                                                <Checkbox
                                                    checked={answers.q5.includes(opt)}
                                                    onChange={() => handleCheckboxChange('q5', opt)}
                                                />
                                            }
                                            label={opt}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q6')} ref={refs.q6}>
                                <FormLabel>6. インターネット利用時間</FormLabel>
                                <Collapse in={!openDialog && visible.q6} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q6}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q6: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q6'));
                                    }}
                                >
                                    {q6Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q7')} ref={refs.q7}>
                                <FormLabel>7. よく利用するサービス</FormLabel>
                                <Collapse in={!openDialog && visible.q7} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <FormGroup row>
                                    {q7Options.map((opt) => (
                                        <FormControlLabel
                                            key={opt}
                                            control={
                                                <Checkbox
                                                    checked={answers.q7.includes(opt)}
                                                    onChange={() => handleCheckboxChange('q7', opt)}
                                                />
                                            }
                                            label={opt}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q8')} ref={refs.q8}>
                                <FormLabel>8. 買い物は主にどこで？</FormLabel>
                                <Collapse in={!openDialog && visible.q8} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q8}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q8: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q8'));
                                    }}
                                >
                                    {q8Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q9')} ref={refs.q9}>
                                <FormLabel>9. 通勤・通学手段</FormLabel>
                                <Collapse in={!openDialog && visible.q9} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q9}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q9: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q9'));
                                    }}
                                >
                                    {q9Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl margin="normal" error={errorFields.includes('q10')} ref={refs.q10}>
                                <FormLabel>10. 食事スタイル</FormLabel>
                                <Collapse in={!openDialog && visible.q10} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q10}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q10: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q10'));
                                    }}
                                >
                                    {q10Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q11')} ref={refs.q11}>
                                <FormLabel>11. よく見るジャンル</FormLabel>
                                <Collapse in={!openDialog && visible.q11} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q11}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q11: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q11'));
                                    }}
                                >
                                    {q11Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl fullWidth margin="normal" error={errorFields.includes('q12')} ref={refs.q12}>
                                <FormLabel
                                    sx={{
                                        color: focused12 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}>
                                    12. 行ってみたい場所
                                </FormLabel>
                                <Collapse in={!openDialog && visible.q12} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/typing.jpg"
                                            alt="入力エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <TextField multiline rows={2} margin="normal" fullWidth
                                    value={answers.q12}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q12: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q12'));
                                    }}
                                    onFocus={() => setFocused12(true)}
                                    onBlur={() => setFocused12(false)} 
                                    error={errorFields.includes('q12')}/></FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q13')} ref={refs.q13}>
                                <FormLabel>13. 音楽ジャンル</FormLabel>
                                <Collapse in={!openDialog && visible.q13} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <FormGroup row>
                                    {q13Options.map((opt) => (
                                        <FormControlLabel
                                            key={opt}
                                            control={
                                                <Checkbox
                                                    checked={answers.q13.includes(opt)}
                                                    onChange={() => handleCheckboxChange('q13', opt)}
                                                />
                                            }
                                            label={opt}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q14')} ref={refs.q14}>
                                <FormLabel>14. 雨の日の過ごし方</FormLabel>
                                <Collapse in={!openDialog && visible.q14} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q14}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q14: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q14'));
                                    }}
                                >
                                    {q14Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl fullWidth margin="normal" error={errorFields.includes('q15')} ref={refs.q15}>
                                <FormLabel
                                    sx={{
                                        color: focused15 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    15. よく使うアプリ
                                </FormLabel>
                                <Collapse in={!openDialog && visible.q15} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/typing.jpg"
                                            alt="入力エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <TextField multiline rows={2} margin="normal" fullWidth
                                    value={answers.q15}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q15: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q15'));
                                    }}
                                    onFocus={() => setFocused15(true)}
                                    onBlur={() => setFocused15(false)}
                                    error={errorFields.includes('q15')}
                                    />
                            </FormControl>
                            <FormControl fullWidth margin="normal" error={errorFields.includes('q16')} ref={refs.q16}>
                                <FormLabel
                                    sx={{
                                        color: focused16 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    16. 最近うれしかったこと</FormLabel>
                                <Collapse in={!openDialog && visible.q16} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/typing.jpg"
                                            alt="入力エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <TextField multiline rows={2} margin="normal" fullWidth
                                    value={answers.q16}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q16: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q16'));
                                    }}
                                    onFocus={() => setFocused16(true)}
                                    onBlur={() => setFocused16(false)} 
                                    error={errorFields.includes('q16')}
                                    />
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q17')} ref={refs.q17}>
                                <FormLabel>17. 困ったときの相談相手</FormLabel>
                                <Collapse in={!openDialog && visible.q17} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q17}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q17: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q17'));
                                    }}
                                >
                                    {q17Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl margin="normal" error={errorFields.includes('q18')} ref={refs.q18}>
                                <FormLabel>18. ストレス対処法</FormLabel>
                                <Collapse in={!openDialog && visible.q18} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q18}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q18: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q18'));
                                    }}
                                >
                                    {q18Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl margin="normal" error={errorFields.includes('q19')} ref={refs.q19}>
                                <FormLabel>19. リラックス方法</FormLabel>
                                <Collapse in={!openDialog && visible.q19} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q19}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q19: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q19'));
                                    }}
                                >
                                    {q19Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" error={errorFields.includes('q20')} ref={refs.q20}>
                                <FormLabel>20. アンケートは答えやすかった？</FormLabel>
                                <Collapse in={!openDialog && visible.q20} timeout={600} >
                                    <Box mt={1}>
                                        <img
                                            src="/ResearchProject2/select.jpg"
                                            alt="選択エラー"
                                            style={{ maxWidth: 300, width: '100%' }}
                                        />
                                    </Box>
                                </Collapse>
                                <RadioGroup row
                                    value={answers.q20}
                                    onChange={(e) => {
                                        setAnswers((prev) => ({ ...prev, q20: e.target.value }))
                                        if (e.target.value) setErrorFields(prev => prev.filter(f => f !== 'q20'));
                                    }}
                                >
                                    {q20Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 3 }}
                                    onClick={handleCheckClick}
                                >
                                    確認画面へ
                                </Button>
                            </Box>
                        </FormGroup>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom>
                                【確認画面】
                            </Typography>
                            {Object.entries(answers).map(([key, val]) => (
                                <Typography key={key} sx={{ mb: 1 }}>
                                    {`${key.replace('q', '')}. ${val && Array.isArray(val) ? val.join(', ') : val || '未回答'}`}
                                </Typography>
                            ))}
                            <Box mt={3} display="flex" justifyContent="center" gap={2}>
                                <Button variant="outlined" onClick={() => setSubmitted(false)}>
                                    編集に戻る
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => setThankYouDialogOpen(true)}>
                                    送信
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <img
                            src="/ResearchProject2/error.jpg" // public フォルダに配置すること
                            alt="エラーイラスト"
                            style={{ width: '300px', height: 'auto', marginBottom: '16px' }}
                        />
                    </Box>
                   <Box display="flex" flexWrap="wrap" gap={2}>
                        {errors
                            .slice()
                            .sort((a, b) => {
                                const numA = parseInt(a.match(/^(\d+)\./)?.[1] || '0', 10);
                                const numB = parseInt(b.match(/^(\d+)\./)?.[1] || '0', 10);
                                return numA - numB;
                            })
                            .map((msg, i) => {
                                const numMatch = msg.match(/^(\d+)\./);
                                const num = numMatch ? numMatch[1] : '??';
                                const isForced = msg.includes('強制エラー');

                                return (
                                    <Typography
                                        key={i}
                                        sx={{
                                            color: isForced ? 'error.main' : 'orange',
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {num}
                                    </Typography>
                                );
                            })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={thankYouDialogOpen} onClose={() => setThankYouDialogOpen(false)}>
                <DialogTitle>実験へのご協力、ありがとうございました。</DialogTitle>
                <DialogContent>
                    <Typography>
                        <Link
                            href="https://www.keithv.com/software/nasatlx/nasatlx-ja.html"
                            underline="hover"
                            sx={{ ml: 1 }}
                        >
                            こちら
                        </Link>
                        よりアンケートへお答えください。
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default SurveyForm;
