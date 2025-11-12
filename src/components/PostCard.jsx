import React from 'react';
    import { motion } from 'framer-motion';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Button } from '@/components/ui/button';
    import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';

    const PostCard = ({ author, avatarUrl, timestamp, content, link, likes, comments, shares }) => {
      return (
        <motion.div
          className="bg-white p-6 rounded-2xl soft-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={avatarUrl} alt={author} />
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-brand-deep-indigo">{author}</p>
                <p className="text-xs text-brand-mid-gray">{timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-brand-mid-gray hover:text-brand-primary-blue">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <p className="my-4 text-brand-charcoal text-base whitespace-pre-wrap">{content}</p>

          {link && (
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="block border border-gray-200 rounded-lg p-3 hover:bg-gray-50 mb-4">
              <p className="font-semibold text-brand-primary-blue">{link.title}</p>
              <p className="text-xs text-brand-mid-gray">{link.url}</p>
            </a>
          )}

          <div className="flex items-center justify-between text-brand-mid-gray">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center space-x-2 text-sm hover:text-brand-primary-blue">
                <ThumbsUp className="h-5 w-5" />
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-sm hover:text-brand-primary-blue">
                <MessageSquare className="h-5 w-5" />
                <span>{comments}</span>
              </Button>
            </div>
            <Button variant="ghost" className="flex items-center space-x-2 text-sm hover:text-brand-primary-blue">
              <Share2 className="h-5 w-5" />
              <span>{shares}</span>
            </Button>
          </div>
        </motion.div>
      );
    };

    export default PostCard;