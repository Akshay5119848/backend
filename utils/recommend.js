
export function recommendByVideo(targetVideo, videos, limit = 6) {
    if (!targetVideo || !Array.isArray(videos)) return [];
  
    // boost match score for category and tags
    const scores = videos.map(v => {
      let score = 0;
      if (v.category && targetVideo.category && v.category === targetVideo.category) score += 3;
  
      if (Array.isArray(v.tags) && Array.isArray(targetVideo.tags)) {
        const common = v.tags.filter(t => targetVideo.tags.includes(t)).length;
        score += common;
      }
  
      // small boost for same author
      if (v.author && targetVideo.author && v.author === targetVideo.author) score += 1;
  
      return { video: v, score };
    });
  
    // sort and return top
    return scores
      .filter(s => s.video.id !== targetVideo.id) // exclude same
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(s => s.video);
  }
  