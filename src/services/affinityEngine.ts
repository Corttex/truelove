import { UserProfile, MatchAffinityResult } from '../types';

export function calculateAffinity(owner: UserProfile, candidate: UserProfile): MatchAffinityResult {
  const rejects: string[] = [];

  // Age eligibility
  if (!candidate.ageAssured || candidate.age < 35) {
    rejects.push('Elegibilidade etária 35+ não confirmada.');
  }

  // Reciprocal age preference check
  if (candidate.age < owner.minAge || candidate.age > owner.maxAge) {
    rejects.push(`Fora da faixa etária que ${owner.name} procura (${owner.minAge}–${owner.maxAge} anos).`);
  }
  if (owner.age < candidate.minAge || owner.age > candidate.maxAge) {
    rejects.push(`Faixa etária não é recíproca (candidato busca ${candidate.minAge}–${candidate.maxAge} anos).`);
  }

  // Same goal
  if (candidate.relationshipGoal !== owner.relationshipGoal) {
    rejects.push('Objetivos de relacionamento incompatíveis.');
  }

  if (rejects.length > 0) {
    return {
      eligible: false,
      score: 0,
      label: 'Não elegível',
      reasons: [],
      rejectionReasons: rejects
    };
  }

  // Calculate weighted similarity
  const reasons: string[] = [];

  // 1. Location match
  let cityScore = 0;
  if (candidate.city.toLowerCase() === owner.city.toLowerCase()) {
    cityScore = 1;
    reasons.push(`Ambos vivem em ${owner.city} (${owner.state}).`);
  } else if (candidate.state.toLowerCase() === owner.state.toLowerCase()) {
    cityScore = 0.65;
    reasons.push(`Ambos estão no estado de ${owner.state}.`);
  }

  // 2. Shared interests
  const ownerInterests = new Set(owner.interests.map(i => i.toLowerCase()));
  const sharedInterests = candidate.interests.filter(i => ownerInterests.has(i.toLowerCase()));
  const interestScore = sharedInterests.length > 0 ? Math.min(1, sharedInterests.length / 3) : 0;
  if (sharedInterests.length > 0) {
    reasons.push(`Interesses em comum: ${sharedInterests.slice(0, 3).join(', ')}.`);
  }

  // 3. Shared values
  const ownerValues = new Set(owner.values.map(v => v.toLowerCase()));
  const sharedValues = candidate.values.filter(v => ownerValues.has(v.toLowerCase()));
  const valueScore = sharedValues.length > 0 ? Math.min(1, sharedValues.length / 2) : 0;
  if (sharedValues.length > 0) {
    reasons.push(`Valores declarados em comum: ${sharedValues.slice(0, 2).join(' e ')}.`);
  }

  // 4. Lifestyle overlap
  const ownerLifestyle = new Set(owner.lifestyle.map(l => l.toLowerCase()));
  const sharedLifestyle = candidate.lifestyle.filter(l => ownerLifestyle.has(l.toLowerCase()));
  const lifestyleScore = sharedLifestyle.length > 0 ? 1 : 0.4;
  if (sharedLifestyle.length > 0) {
    reasons.push(`Estilo de vida semelhante: ${sharedLifestyle[0]}.`);
  }

  // 5. Verification bonus
  if (candidate.verified) {
    reasons.push('Perfil com documento e selfie verificados oficialmente.');
  }

  // Weightings: City (25%), Interests (30%), Values (30%), Lifestyle (15%)
  const rawScore = (cityScore * 0.25) + (interestScore * 0.30) + (valueScore * 0.30) + (lifestyleScore * 0.15);
  const scorePercent = Math.min(99, Math.max(45, Math.round(rawScore * 100)));

  let label: MatchAffinityResult['label'] = 'Afinidade inicial';
  if (scorePercent >= 82) {
    label = 'Excelente afinidade';
  } else if (scorePercent >= 70) {
    label = 'Boa afinidade';
  } else if (scorePercent >= 55) {
    label = 'Afinidade relevante';
  }

  return {
    eligible: true,
    score: scorePercent,
    label,
    reasons: reasons.slice(0, 4),
    rejectionReasons: []
  };
}
