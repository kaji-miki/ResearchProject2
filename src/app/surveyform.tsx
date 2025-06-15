'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';

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
    };




    return (
        <Box width="100%">
            <Card>
                <CardContent>
                    {!submitted ? (
                        <FormGroup>
                            <FormControl margin="normal">
                                <FormLabel
                                    sx={{
                                        color: focused1 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    1. 年齢（必須）</FormLabel>
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    fullWidth
                                    value={answers.q1}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q1: e.target.value }))}
                                    onFocus={() => setFocused1(true)}
                                    onBlur={() => setFocused1(false)} />
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>2. 性別</FormLabel>
                                <RadioGroup
                                    row
                                    value={answers.q2}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q2: e.target.value }))}
                                >
                                    {q2Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <FormLabel>3. お住まいの地域（都道府県）</FormLabel>
                                <Select
                                    value={answers.q3}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q3: e.target.value }))}
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

                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>4. 普段使う言語を教えてください</FormLabel>
                                <RadioGroup row
                                    value={answers.q4}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q4: e.target.value }))}
                                >
                                    {q4Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>5. 利用しているデバイス</FormLabel>
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
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>6. インターネット利用時間</FormLabel>
                                <RadioGroup row
                                    value={answers.q6}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q6: e.target.value }))}
                                >
                                    {q6Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>7. よく利用するサービス</FormLabel>
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
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>8. 買い物は主にどこで？</FormLabel>
                                <RadioGroup row
                                    value={answers.q8}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q8: e.target.value }))}
                                >
                                    {q8Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>9. 通勤・通学手段</FormLabel>
                                <RadioGroup row
                                    value={answers.q9}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q9: e.target.value }))}
                                >
                                    {q9Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>10. 食事スタイル</FormLabel>
                                <RadioGroup row
                                    value={answers.q10}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q10: e.target.value }))}
                                >
                                    {q10Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>11. よく見るジャンル</FormLabel>
                                <RadioGroup row
                                    value={answers.q11}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q11: e.target.value }))}
                                >
                                    {q11Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <FormLabel
                                    sx={{
                                        color: focused12 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}>
                                    12. 行ってみたい場所
                                </FormLabel>
                                <TextField multiline rows={2} margin="normal" fullWidth
                                    value={answers.q12}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q12: e.target.value }))}
                                    onFocus={() => setFocused12(true)}
                                    onBlur={() => setFocused12(false)} /></FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>13. 音楽ジャンル</FormLabel>
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
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>14. 雨の日の過ごし方</FormLabel>
                                <RadioGroup row
                                    value={answers.q14}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q14: e.target.value }))}
                                >
                                    {q14Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <FormLabel
                                    sx={{
                                        color: focused15 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    15. よく使うアプリ
                                </FormLabel>
                                <TextField multiline rows={2} margin="normal" fullWidth
                                    value={answers.q15}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q15: e.target.value }))}
                                    onFocus={() => setFocused15(true)}
                                    onBlur={() => setFocused15(false)} />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <FormLabel
                                    sx={{
                                        color: focused16 ? 'primary.main' : '',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    16. 最近うれしかったこと</FormLabel>
                                <TextField multiline rows={2} margin="normal" fullWidth
                                    value={answers.q16}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q16: e.target.value }))}
                                    onFocus={() => setFocused16(true)}
                                    onBlur={() => setFocused16(false)} />
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>17. 困ったときの相談相手</FormLabel>
                                <RadioGroup row
                                    value={answers.q17}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q17: e.target.value }))}
                                >
                                    {q17Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>18. ストレス対処法</FormLabel>
                                <RadioGroup row
                                    value={answers.q18}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q18: e.target.value }))}
                                >
                                    {q18Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>19. リラックス方法</FormLabel>
                                <RadioGroup row
                                    value={answers.q19}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q19: e.target.value }))}
                                >
                                    {q19Options.map((opt) => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" margin="normal">
                                <FormLabel>20. アンケートは答えやすかった？</FormLabel>
                                <RadioGroup row
                                    value={answers.q20}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, q20: e.target.value }))}
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
                                    onClick={() => setSubmitted(true)}
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
                                <Button variant="contained" color="primary" >
                                    送信
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default SurveyForm;
